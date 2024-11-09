const Joi = require("joi");


const languageCreateVal =Joi.object({
    name:Joi.string().required(),
})  

const languageEditVal =Joi.object({
    name:Joi.string().required(),
    languageId:Joi.string().required()
})  

const languageDeleteVal =Joi.object({
    languageId:Joi.string().required()
})


module.exports ={languageCreateVal,languageDeleteVal,languageEditVal}
