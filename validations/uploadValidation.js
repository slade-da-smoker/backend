const Joi = require('joi');

const fileUploadSchema = Joi.object({
    // For file uploads, we'll validate the file properties
    pdf: Joi.object({
        fieldname: Joi.string().valid('pdf').required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('application/pdf').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5 * 1024 * 1024).required() // 5MB limit
    }).required()
});

const getPDFsSchema = Joi.object({
    // Query parameters for GET /pdfs route
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().valid('uploadDate', 'filename', 'originalName').default('uploadDate'),
    order: Joi.string().valid('asc', 'desc').default('desc')
});

module.exports = {
    fileUploadSchema,
    getPDFsSchema
}; 