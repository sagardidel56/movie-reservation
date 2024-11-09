
const validations = (joiSchema, validateOn = 'body') => (req, res, next) => {
    const validate = joiSchema.validate(req[validateOn])
    console.log(req[validateOn])
    if (validate.error) {
        res.status(400).json({
            message:validate.error.details[0].message,
            success:false,
            status:400
        })
        return
    }
    next()
}

module.exports = validations