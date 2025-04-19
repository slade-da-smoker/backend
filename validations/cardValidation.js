const Joi = require('joi');

const cardGenerationSchema = Joi.object({
    passport: Joi.string()
        .required()
        .messages({
            'string.empty': 'Passport is required',
            'any.required': 'Passport is required'
        }),

    name: Joi.string()
        .required()
        .min(2)
        .max(100)
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 100 characters',
            'any.required': 'Name is required'
        }),

    matric: Joi.string()
        .required()
        .pattern(/^[A-Z0-9]+$/)
        .messages({
            'string.empty': 'Matric number is required',
            'string.pattern.base': 'Matric number must contain only uppercase letters and numbers',
            'any.required': 'Matric number is required'
        }),

    faculty: Joi.string()
        .required()
        .messages({
            'string.empty': 'Faculty is required',
            'any.required': 'Faculty is required'
        }),

    program: Joi.string()
        .required()
        .messages({
            'string.empty': 'Program is required',
            'any.required': 'Program is required'
        }),

    state: Joi.string()
        .required()
        .messages({
            'string.empty': 'State is required',
            'any.required': 'State is required'
        }),

    blood: Joi.string()
        .required()
        .messages({
            'string.empty': 'Blood group is required',
            'any.required': 'Blood group is required'
        }),

    expect: Joi.string()
        .required()
        .messages({
            'string.empty': 'Expected graduation year is required',
            'any.required': 'Expected graduation year is required'
        }),

    sign: Joi.string()
        .required()
        .messages({
            'string.empty': 'Signature is required',
            'any.required': 'Signature is required'
        }),

    session: Joi.string()
        .required()
        .pattern(/^\d{4}\/\d{4}$/)
        .messages({
            'string.empty': 'Session is required',
            'string.pattern.base': 'Session must be in the format YYYY/YYYY',
            'any.required': 'Session is required'
        }),

    semester: Joi.string()
        .required()
        .valid('First', 'Second')
        .messages({
            'string.empty': 'Semester is required',
            'any.only': 'Semester must be either First or Second',
            'any.required': 'Semester is required'
        }),

    level: Joi.string()
        .required()
        .pattern(/^\d{3}$/)
        .messages({
            'string.empty': 'Level is required',
            'string.pattern.base': 'Level must be a 3-digit number',
            'any.required': 'Level is required'
        }),

    course: Joi.string()
        .required()
        .messages({
            'string.empty': 'Course is required',
            'any.required': 'Course is required'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        })
});

module.exports = {
    cardGenerationSchema
}; 