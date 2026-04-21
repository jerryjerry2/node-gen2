const Joi = require('joi');

const registerUserSchema = Joi.object({
    name : Joi.string().min(5).required(),
    email : Joi.string().email().required(),
    password : Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,30}$'))
    .message('Password must be 8-30 characters and include uppercase, lowercase, and a number.')
    .required(),
});

const loginUserSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
});

const resendLinkEmailSchema = Joi.object({
    email : Joi.string().email().required(),
});

module.exports ={
    registerUserSchema,
    loginUserSchema,
    resendLinkEmailSchema
}