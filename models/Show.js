
const mongoose = require('mongoose')

const Show = mongoose.Schema({
    cinemaId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    screenId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    movieId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    languageId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    startTime:{
        type:Date,
        required:true,
    },
    endTime:{
        type:Date,
        required:true
    },
},{
    timestamps:true
})

const ShowModel = new mongoose.model("shows", Show)

module.exports = ShowModel
