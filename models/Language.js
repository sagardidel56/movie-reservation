const mongoose = require('mongoose')

const Language = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default:false
    }
}, {
    timestamps: true

})

const LanguageModel = new mongoose.model("Language",Language)
module.exports = LanguageModel