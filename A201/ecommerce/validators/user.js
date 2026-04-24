const Joi = require('joi');

const registerUserSchema = Joi.object({
    name : Joi.string().min(3).required(),
    email : Joi.string().email().min(3).required(),
    password : Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
})

const loginUserSchema = Joi.object({
    email : Joi.string().email().min(3).required(),
    password : Joi.required()
})

module.exports = {
    registerUserSchema,
    loginUserSchema
}