
const express = require('express')
const jwtAuthenticate = require('../validations/authenticateJWT')
const adminAuth = require('../validations/adminAuth')
const validations = require('../validations')
const { internalServerError } = require('../helpers/utils')
const { createScreenVal } = require('../validations/screensSchema')
const ScreensModel = require('../models/Screens')

const router = express.Router()

router.post('/screens/create', jwtAuthenticate, adminAuth, validations(createScreenVal), async (req, res) => {
    try {
        const body = req.body
        const sNo = body?.sNo
        const seatsCount = body?.seatsCount
        const stairs = body?.stairs
        const type = body?.type
        const data = []
        const cinemaId = body?.cinemaId
        const name = body?.name.toLowerCase()
        let objNew = {
            typeName: type,
            seatSection: []
        }
        for (let i = 0; i < stairs.length; i++) {
            const indexx = seatsCount.indexOf(stairs[i])
            seatsCount.splice(indexx + 1, 0, undefined)
            // seatsCount.splice(stairs[i], 0, undefined)//don't remove
        }
        for (let i = 0; i < sNo.length; i++) {
            let obj = {
                seatsData: []
            }
            obj.sNo = sNo[i]
            for (let j = 0; j < seatsCount.length; j++) {
                let seatObj = {
                }
                if (!seatsCount[j]) {
                    seatObj = {
                        isDeleted: false,
                        isStairs: true,
                    }
                } else {
                    seatObj = {
                        no: seatsCount[j],
                        isBooked: false,
                        isDeleted: false,
                        isStairs: false,
                    }
                }
                obj.seatsData.push(seatObj)
            }
            objNew.seatSection = [...objNew.seatSection, obj]
        }
        data.push(objNew)
        const exists = await ScreensModel.find({ name: name })
        console.log({ exists, cinemaId, name })
        if (exists?.length) {
            res.status(403).json({
                message: "Screen Already exists",
                status: 403,
                success: false,
                data: exists
            })
            return
        }
        const screenData = await ScreensModel.create({
            cinemaId,
            name,
            seats: data
        })

        res.status(200).json({
            message: "Screen successfully created",
            success: 200,
            status: true,
            data: screenData,
        })
    } catch (error) {
        internalServerError(req, error, res)
    }
})

module.exports = router
