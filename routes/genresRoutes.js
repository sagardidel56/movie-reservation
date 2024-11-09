const express = require('express')
const validations = require('../validations')
const { genresCreateVal, genresDeleteVal ,genresEditVal} = require('../validations/genresSchema')
const jwtAuthenticate = require('../validations/authenticateJWT')
const adminAuth = require('../validations/adminAuth')
const { errorLogger, internalServerError } = require('../helpers/utils')
const GenresModel = require('../models/Genres')

const router = express.Router()

router.post('/genres/create', jwtAuthenticate, adminAuth, validations(genresCreateVal), async (req, res) => {
    try {
        const name = req.body?.name?.toLowerCase()
        const exists = await GenresModel.findOne({ name: name, isDeleted: false })
        if (exists) {
            res.status(403).json({
                message: "Genres already exits",
                success: false,
                status: 403,
            })
            return
        }

        const genresData = await GenresModel.create({
            name,
        })

        res.status(200).json({
            message: "New genres created successfully",
            success: true,
            status: 200,
            data: genresData
        })
    } catch (error) {
        errorLogger(req.url, error)
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            status: 500,
        })
    }
})

router.get('/genres', async (req, res) => {
    try {
        const genres = await GenresModel.find({ isDeleted: false })
        res.status(200).json({
            message: "genres fetched successfully",
            data: genres,
            success: true,
            status: 200
        })

    } catch (error) {
        internalServerError(req, error,res)
    }

})

router.post('/genres/edit', jwtAuthenticate, adminAuth, validations(genresEditVal), async (req, res) => {
    try {
        const { name, genresId } = req.body
        const exists = await GenresModel.findOne({ _id: genresId, isDeleted: false })
        if (!exists) {
            res.status(404).json({
                message: "Genres not found",
                success: false,
                status: 404,
            })
            return
        }

        const genresData = await GenresModel.findByIdAndUpdate({ _id: genresId }, { name: name.toLowerCase() }, { new: true })

        res.status(200).json({
            message: "Genres updated",
            success: true,
            status: 200,
            data: genresData
        })
    } catch (error) {
        internalServerError(req, error,res)
    }

})

router.post('/genres/delete', jwtAuthenticate, adminAuth, validations(genresDeleteVal), async (req, res) => {
    try {
        const { genresId } = req.body
        const exists = await GenresModel.findOne({ _id: genresId, isDeleted: false })
        if (!exists) {
            res.status(404).json({
                message: "Genres not found",
                success: false,
                status: 404,
            })
            return
        }

        const genresData = await GenresModel.findByIdAndUpdate({ _id: genresId }, { isDeleted: true })

        res.status(200).json({
            message: "Genres Delete successfully",
            success: true,
            status: 200,
            data: genresData
        })
    } catch (error) {
        internalServerError(req, error)
    }

})

module.exports = router
