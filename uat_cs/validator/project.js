const Joi = require('joi');

const createSchema = Joi.object({
    name : Joi.string().trim().required().messages({
        'any.required' : 'Name is required',
        'string.empty' : 'Name is required',
    })    
})

const updateSchema = Joi.object({
    id: Joi.number().integer().positive().required()
            .messages({
            'number.base': 'Id must be a number',
            'number.integer': 'Id must be an integer',
            'number.positive': 'Id must be a positive number',
            'any.required': 'Id is required',
        }),
    name: Joi.string().trim().required()
        .messages({
            'any.required': 'Name is required',
            'string.empty': 'Name is required',
        }),
});

const deleteSchema = Joi.object({
    id: Joi.number().integer().positive().required()
        .messages({
            'number.base': 'Id must be a number',
            'number.integer': 'Id must be an integer',
            'number.positive': 'Id must be a positive number',
            'any.required': 'Id is required',
        }),
});

const updateLogoSchema = Joi.object({
    id: Joi.number().integer().positive().required()
        .messages({
            'number.base': 'Id must be a number',
            'number.integer': 'Id must be an integer',
            'number.positive': 'Id must be a positive number',
            'any.required': 'Id is required',
        }),
});

module.exports = {
    createSchema,
    updateSchema,
    deleteSchema,
    updateLogoSchema
}