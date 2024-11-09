const express = require("express")
const validations = require("../validations")
const { movieCreateVal, movieEditVal, movieDeleteVal } = require('../validations/movieSchema')
const { internalServerError, deleteImg } = require("../helpers/utils")
const MovieModel = require("../models/Movies")
const upload = require("../multer")
const adminAuth = require("../validations/adminAuth")
const jwtAuthenticate = require("../validations/authenticateJWT")
const router = express.Router()
const fs = require('node:fs')

// router.post('/movies/create', validations(movieCreateVal), upload.single('posterImage'), async (req, res) => {
router.post('/movies/create', upload.single('posterImage'), jwtAuthenticate, adminAuth, validations(movieCreateVal), async (req, res) => {
    try {
        const body = req.body
        const title = body?.title?.toLowerCase()
        const exists = await MovieModel.findOne({ title: title, isDeleted: false })
        if (exists) {
            // remove image upload --->>>>
            deleteImg(req?.file?.path)
            res.status(403).json({
                message: "Movie already exists",
                status: 403,
                success: false,
            })
            return
        }

        const movieData = await MovieModel.create({
            ...body,
            title,
            posterImage: req?.file?.path
        })
        res.status(200).json({
            message: "Movie created",
            status: 200,
            success: false,
            data: body
        })
    } catch (error) {
        internalServerError(req, error, res)
    }

})

// router.get('/movies')

router.post('/movies/edit', upload.single('posterImage'), jwtAuthenticate, adminAuth, validations(movieEditVal), async (req, res) => {
    try {
        const body = req?.body
        const exists = await MovieModel.findOne({ _id: body?.movieId, isDeleted: false })
        const data = body?.data
        console.log({ body })
        if (!exists) {
            res.status(404).json({
                message: 'Movies not found!',
                success: false,
                status: 404,
                data: {}
            })
            return
        }
        if (req.file) {
            data.posterImage = req?.file?.path
        }

        const updateMovieData = await MovieModel.findByIdAndUpdate({ _id: body?.movieId }, { ...data }, { new: true }).select('-__v -createdAt -updatedAt')

        res.status(200).json({
            message: 'Movie update successfully',
            success: true,
            status: 200,
            data: body
        })
    } catch (error) {
        internalServerError(req, error, res)
    }
})

router.post('/movies/delete', jwtAuthenticate, adminAuth, validations(movieDeleteVal), async (req, res) => {
    try {
        const { movieId } = req.body
        const exists = await MovieModel.findOne({ _id: movieId, isDeleted: false })
        if (!exists) {
            res.status(404).json({
                message: "Movie doesn't exists",
                status: 404,
                success: false
            })
            return
        }

        const deleteMovie = await MovieModel.findByIdAndUpdate({ _id: movieId }, { isDeleted: true }, { new: true })
        
        deleteImg(deleteMovie?.posterImage)
        res.status(200).json({
            message: "Movie deleted successfully!",
            status: 200,
            success: true,
            deleteMovie:deleteMovie
        })
    } catch (error) {
        internalServerError(req, error, res)
    }
})

module.exports = router