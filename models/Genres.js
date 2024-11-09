const mongoose = require('mongoose')


const Genres = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})


const GenresModel = new mongoose.model("Genres", Genres)
module.exports = GenresModel
