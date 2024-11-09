const Joi = require('joi')

const createScreenVal = Joi.object({
    sNo: Joi.array().items(Joi.string()).required(),
    seatsCount: Joi.array().items(Joi.number()).required(),
    stairs: Joi.array().items(Joi.number()).required(),
    type: Joi.string().required(),
    name:Joi.string().required(),
    cinemaId:Joi.string().required(),
})

module.exports = { createScreenVal }
