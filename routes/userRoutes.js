const express = require('express')
const { errorLogger } = require('../helpers/utils')
const bcrypt = require('bcryptjs')
const router = express.Router()
const validations = require('../validations')
const {
    userRegisterFields,
    userLoginFields
} = require('../validations/userSchema')
const UserModel = require('../models/User')
const { JWT_SECRET } = require('../constants')
const jwt = require("jsonwebtoken")
const jwtAuthenticate = require('../validations/authenticateJWT')

router.post('/user/auth/register', validations(userRegisterFields), async (req, res) => {
    try {
        const { name, email, password, DOB } = req.body
        const userEmail = await UserModel.findOne({ email: email })
        if (userEmail) {//email availability
            res.status(400).json({
                message: "Email already registered",
                success: false,
                status: 400
            })
            return
        }
        const salt = bcrypt.genSaltSync(10)
        // Key Points:
        // Salt: A random value used to ensure unique password hashes.
        // 10 rounds: Controls the complexity of salt generation.
        // Synchronous: This method is blocking; for large-scale apps, you may want to use the asynchronous version for better performance.
        const hashedPassword = await bcrypt.hash(password, salt)
        // const dob = new Date(DOB)

        const userData = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            DOB: new Date(DOB),
            // role: ROLE.USER //role will be set default using schema 
        })

        res.status(200).json({
            message: "user registered",
            status: 200,
            data: userData,
            success: true,
        })
    } catch (error) {
        errorLogger(req.url, error)
        res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            success: false
        })
    }
})

router.post('/user/auth/login', validations(userLoginFields), async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await UserModel.findOne({ email: email })
        if (!userData) {
            res.status(400).json({
                message: "Email not registered",
                success: false,
                status: 400
            })
            return
        }
        const isMatched = await bcrypt.compare(password, userData.password)
        if (!isMatched) {
            res.status(400).json({
                message: "Incorrect password!",
                success: false,
                status: 400
            })
            return
        }
        const token = jwt.sign({ id: userData._id }, JWT_SECRET)
        const updatedUser = await UserModel.findByIdAndUpdate({ _id: userData?._id }, { token }, { new: true })
        res.status(200).json({
            message: "user logged successfully!",
            status: 200,
            data: updatedUser,
            success: true,
        })
    } catch (error) {
        errorLogger(req.url, error)
        res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            success: false
        })
    }
})

router.get('/user/profile', jwtAuthenticate, async (req, res) => {
    try {
        res.status(200).json({
            message: "Profile fetched successfully",
            status: 200,
            success: true,
            data: req.user
        })
    } catch (error) {

    }

})

// todo's list (users) -->>
// promote user to admin 
// profile + edit user



module.exports = router