
// const express = require('express')

// const router = express.Router()

// router.get('/test', (req, res) => {
//     console.log('test running')
//     res.status(200).json({
//         message: "server connected"
//     })
// })

const user = require('./userRoutes')
const movies = require('./movieRoutes')
const genres = require('./genresRoutes')
const language = require('./languageRoutes')
const cinema = require('./cinemaRoutes')
const screens = require('./screensRoutes')
const shows = require('./showsRoutes')

module.exports = [user, movies, genres, language, cinema, screens, shows]