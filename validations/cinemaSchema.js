const Joi = require('joi')

const createCinemaVal = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required()
})


const editCinemaVal = Joi.object({
    name: Joi.string().optional(),
    location: Joi.string().optional(),
    cinemaId: Joi.string().required()
})

const deleteCinemaVal = Joi.object({
    cinemaId: Joi.string().required()
})

module.exports = {
    createCinemaVal,
    editCinemaVal,
    deleteCinemaVal
}