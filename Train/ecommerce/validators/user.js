const joi = require('joi');

const createUserSchema = joi.object({
    email : Joi.string().email().required()
})

module.exports = {
    createUserSchema
}