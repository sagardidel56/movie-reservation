const Joi = require("joi");


const genresCreateVal =Joi.object({
    name:Joi.string().required(),
})  

const genresEditVal =Joi.object({
    name:Joi.string().required(),
    genresId:Joi.string().required()
})  

const genresDeleteVal =Joi.object({
    genresId:Joi.string().required()
})


module.exports ={genresCreateVal,genresDeleteVal,genresEditVal}
