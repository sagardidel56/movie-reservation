const express = require('express')
const jwtAuthenticate = require('../validations/authenticateJWT')
const adminAuth = require('../validations/adminAuth')
const validations = require('../validations')
const { createShowVal } = require('../validations/showsSchema')
const { internalServerError } = require('../helpers/utils')
const MovieModel = require('../models/Movies')
const { default: mongoose } = require('mongoose')
const ScreensModel = require('../models/Screens')
const ShowModel = require('../models/Show')

const router = express.Router()


router.post('/shows/create', jwtAuthenticate, adminAuth, validations(createShowVal), async (req, res) => {
    try {
        const { movieId, languageId, cinemaId, screenId, format, startTime } = req.body

        //check if movie is available in language ----
        const movieHasLang = await MovieModel.aggregate([ //returns the docs is lang exists
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(movieId)
                },
            },
            {
                $match: {
                    language: { //the array field to check in   
                        $in: [  // this is to check anything in an array
                            new mongoose.Types.ObjectId(languageId)  // id to check
                        ]
                    }
                }
            }
        ])

        // or---  
        const hasLang = await MovieModel.aggregate([ //returns boolean in languageExists
            {
                $match: {// get the movie
                    _id: new mongoose.Types.ObjectId(movieId)
                }
            },
            {
                $project: {
                    languageExists: { //new field
                        $cond: {
                            if: {
                                $in: [
                                    new mongoose.Types.ObjectId(languageId), "$language" // id to search , field to search in
                                ]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        ])

        //or---
        const movie = await MovieModel.findOne({
            _id: movieId,
            language: languageId //findOne will find the languageId in language array
        })
        /// ------------END ------------->>
        if (!hasLang?.[0]?.languageExists) {
            res.status(403).json({
                message: 'Movie is not available in this language',
                status: 403,
                success: false,
            })
            return
        }
        //check if movie is available in format
        const hasFormat = await MovieModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(movieId)
                }
            },
            {
                $project: {
                    hasFormat: {
                        $cond: {
                            if: {
                                $in: [
                                    format, '$format'
                                ]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        ])
        if (!hasFormat?.[0]?.hasFormat) {
            res.status(403).json({
                message: 'Movie is not available in this format',
                status: 403,
                success: false,
            })
            return
        }
        /// ------------END ------------->>

        //check if cinema has the screen
        const hasScreen = await ScreensModel.findOne({
            _id: screenId,
            cinemaId
        })
        if (!hasScreen) {
            res.status(403).json({
                message: 'Screen is not present in this Cinema',
                status: 403,
                success: false,
            })
            return
        }
        /// ------------END ------------->>

        // end time with 30 min of gap
        // check if show is available
        console.log({ startTime })
        // const showData = await ShowModel.create({
        //     movieId,
        //     languageId,
        //     cinemaId,
        //     screenId,
        //     format,
        //     startTime,
        //     endTime:startTime
        // })
        // console.log({ startTime, showData })

        //  ------------END ------------->>
        
        res.status(200).json({
            message: 'Show created successful',
            status: 200,
            success: true,
            // data: showData
        })
    } catch (error) {
        internalServerError(req, error, res)
    }
})

module.exports = router
