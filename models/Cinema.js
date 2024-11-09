
const mongoose = require("mongoose")

const Cinema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    // screens: {
    //     type: [mongoose.Types.ObjectId],
    //     required: false
    // }
})

const CinemaModel = new mongoose.model("Cinema", Cinema)

module.exports = CinemaModel
