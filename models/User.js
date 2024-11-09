const { required } = require('joi')
const mongoose = require('mongoose')
const { ROLE } = require('../constants')


const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    // role: {
    //     type: String,
    //     required: true
    // }
    role: {
        type: String,
        enum: [ROLE.USER, ROLE.ADMIN],
        default: ROLE.USER
    },
    token:{
        type:String,
        required:false
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}
)

const UserModel = new mongoose.model("User", User)
module.exports = UserModel 
