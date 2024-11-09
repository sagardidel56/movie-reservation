const mongoose = require('mongoose')

const Movie = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posterImage: {
        type: String,
        required: false,
        default:""
    },
    media: {
        type: [String],
        required: true
    },
    language: {
        type: [mongoose.Types.ObjectId],
        required: true,
        ref: 'Language', // Refers to the Language collection
    },
    genres: {
        type: [mongoose.Types.ObjectId],
        ref: 'Genre', // Refers to the Genre collection
        required: true
    },
    format: {
        type: [String],
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    duration: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    imdbRating: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const MovieModel = new mongoose.model("Movies", Movie)

module.exports = MovieModel

