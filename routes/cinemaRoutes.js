const express = require('express')
const jwtAuthenticate = require('../validations/authenticateJWT')
const adminAuth = require('../validations/adminAuth')
const validations = require('../validations')
const { createCinemaVal, editCinemaVal, deleteCinemaVal } = require('../validations/cinemaSchema')
const { internalServerError } = require('../helpers/utils')
const CinemaModel = require('../models/Cinema')

const router = express.Router()

router.post('/cinema/create', jwtAuthenticate, adminAuth, validations(createCinemaVal), async (req, res) => {
    try {
        let { name, location } = req.body
        name = name?.toLowerCase()
        location = location?.toLowerCase()
        const exists = await CinemaModel.findOne({ name, location, isDeleted: false })
        if (exists) {
            res.status(403).json({
                message: "Cinema already exists",
                status: 403,
                success: false
            })
            return
        }

        const cinemaData = await CinemaModel.create({
            name,
            location
        })
        res.status(200).json({
            message: "Cinema created",
            status: 200,
            success: false,
            data: cinemaData
        })
    } catch (error) {
        internalServerError(req, error, res)
    }

})

router.post('/cinema/edit', jwtAuthenticate, adminAuth, validations(editCinemaVal), async (req, res) => {
    try {
        let body = req.body
        const cinemaId = body.cinemaId
        const data = {}
        if (body?.name) {
            data.name = body?.name?.toLowerCase()
        }
        if (body?.location) {
            data.location = body?.location?.toLowerCase()
        }
        const exists = await CinemaModel.findOne({ _id: cinemaId, isDeleted: false })
        if (!exists) {
            res.status(404).json({
                message: "Cinema not found",
                status: 404,
                success: false
            })
            return
        }
        const updatedCinema = await CinemaModel.findByIdAndUpdate({ _id: cinemaId }, { ...data }, { new: true })
        res.status(200).json({
            message: "Cinema updated successfully!",
            status: 200,
            success: false,
            data: updatedCinema
        })

    } catch (error) {
        internalServerError(req, error, res)
    }
})

router.post('/cinema/delete', jwtAuthenticate, adminAuth, validations(deleteCinemaVal), async (req, res) => {
    try {
        const cinemaId = req?.body?.cinemaId
        const exists = await CinemaModel.findOne({ _id: cinemaId, isDeleted: false })
        if (!exists) {
            res.status(404).json({
                message: "Cinema not found",
                status: 404,
                success: false
            })
            return
        }
        const upDeletedCinema = await CinemaModel.findByIdAndUpdate({ _id: cinemaId }, { isDeleted: true }, { new: true })
        res.status(200).json({
            message: "Cinema deleted successfully!",
            status: 200,
            success: false,
        })

    } catch (error) {
        internalServerError(req, error, res)
    }

})


module.exports = router

