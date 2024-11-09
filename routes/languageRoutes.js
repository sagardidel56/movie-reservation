const express = require('express')
const validations = require('../validations')
const { languageCreateVal,languageDeleteVal,languageEditVal} = require('../validations/languageSchema')
const jwtAuthenticate = require('../validations/authenticateJWT')
const adminAuth = require('../validations/adminAuth')
const { errorLogger, internalServerError } = require('../helpers/utils')
const LanguageModel = require('../models/Language')

const router = express.Router()

router.post('/language/create', jwtAuthenticate, adminAuth, validations(languageCreateVal), async (req, res) => {
    try {
        const name = req.body?.name?.toLowerCase()
        const exists = await LanguageModel.findOne({ name: name, isDeleted: false })
        if (exists) {
            res.status(403).json({
                message: "Language already exits",
                success: false,
                status: 403,
            })
            return
        }

        const genresData = await LanguageModel.create({
            name,
        })

        res.status(200).json({
            message: "New language created successfully",
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

router.get('/language', async (req, res) => {
    try {
        const language = await LanguageModel.find({ isDeleted: false })
        res.status(200).json({
            message: "language fetched successfully",
            data: language,
            success: true,
            status: 200
        })

    } catch (error) {
        internalServerError(req, error,res)
    }

})

router.post('/language/edit', jwtAuthenticate, adminAuth, validations(languageEditVal), async (req, res) => {
    try {
        const { name, languageId } = req.body
        const exists = await LanguageModel.findOne({ _id: languageId, isDeleted: false })
        if (!exists) {
            res.status(404).json({
                message: "Language not found",
                success: false,
                status: 404,
            })
            return
        }

        const genresData = await LanguageModel.findByIdAndUpdate({ _id: languageId }, { name: name.toLowerCase() }, { new: true })

        res.status(200).json({
            message: "Language updated",
            success: true,
            status: 200,
            data: genresData
        })
    } catch (error) {
        internalServerError(req, error,res)
    }

})

router.post('/language/delete', jwtAuthenticate, adminAuth, validations(languageDeleteVal), async (req, res) => {
    try {
        const { languageId } = req.body
        const exists = await LanguageModel.findOne({ _id: languageId, isDeleted: false })
        if (!exists) {
            res.status(404).json({
                message: "Language not found",
                success: false,
                status: 404,
            })
            return
        }

        const genresData = await LanguageModel.findByIdAndUpdate({ _id: languageId }, { isDeleted: true })

        res.status(200).json({
            message: "Language Delete successfully",
            success: true,
            status: 200,
            data: genresData
        })
    } catch (error) {
        internalServerError(req, error,res)
    }

})

module.exports = router