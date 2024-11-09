const Joi = require("joi");

const createShowVal = Joi.object({
    cinemaId: Joi.string().required(),
    screenId: Joi.string().required(),
    movieId: Joi.string().required(),
    languageId: Joi.string().required(),
    format: Joi.string().required(),
    startTime: Joi.string().required()
})


module.exports = {
    createShowVal
}
