const Joi = require('joi')

const userRegisterFields = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    DOB:Joi.string().required()//YYYY-MM-DD
})

const userLoginFields = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})

module.exports= {
    userRegisterFields,
    userLoginFields
}