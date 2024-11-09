const { JWT_SECRET } = require("../constants")
const { errorLogger } = require("../helpers/utils")
const jwt = require('jsonwebtoken')
const UserModel = require("../models/User")

const jwtAuthenticate = async (req, res, next) => {
    try {
        const str = req.headers?.authorization
        console.log("strstr--->>>",{str})
        if (!str) {
            res.status(401).json({
                message: "Token not available",
                status: 401,
                success: false
            })
            return
        }

        const tokenArr = str.split(' ')
        const prefix = tokenArr?.[0]
        const token = tokenArr?.[1]
        if (!prefix || String(prefix).toLowerCase() !== 'bearer') {
            res.status(401).json({
                message: "Token prefix missing",
                status: 401,
                success: false
            })
            return
        }
        if (!token) {
            res.status(401).json({
                message: "Incorrect token",
                status: 401,
                success: false
            })
            return

        }

        const data = jwt.verify(token, JWT_SECRET)
        if (!data?.id) {
            res.status(401).json({
                message: "Incorrect token",
                status: 401,
                success: false
            })
            return

        }
        const user = await UserModel.findById({ _id: data?.id })
        if (!user) {
            res.status(401).json({
                message: "Incorrect token",
                status: 401,
                success: false
            })
            return
        }
        req.user = user
        next()
    } catch (error) {
        errorLogger(req.url, error)
        res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            success: false
        })
    }

}

module.exports = jwtAuthenticate