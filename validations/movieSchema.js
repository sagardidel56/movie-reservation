const Joi = require("joi");

const movieCreateVal = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    language: Joi.array().items(Joi.string()).required(), //array of strings,
    genres: Joi.array().items(Joi.string()).required(), //array of strings,
    format: Joi.array().items(Joi.string()).required(),
    // language: Joi.string().required(), //array of strings,
    // genres: Joi.string().required(), //array of strings,
    // format: Joi.string().required(),
    duration: Joi.string().required(),
    releaseDate: Joi.string().required(),
    rating: Joi.string().required(),
    imdbRating: Joi.string().optional()
})

const movieEditVal = Joi.object({
    movieId: Joi.string().required(),
    data: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        language: Joi.array().items(Joi.string()).optional(), //array of strings,
        genres: Joi.array().items(Joi.string()).optional(), //array of strings,
        format: Joi.array().items(Joi.string()).optional(),
        duration: Joi.string().optional(),
        releaseDate: Joi.string().optional(),
        rating: Joi.string().optional(),
        imdbRating: Joi.string().optional()
    })
})
const movieDeleteVal = Joi.object({
    movieId: Joi.string().required()
})
module.exports = {
    movieCreateVal,
    movieEditVal,
    movieDeleteVal
}