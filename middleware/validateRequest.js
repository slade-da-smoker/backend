const validateRequest = (schema) => {
    return (req, res, next) => {
        // For file uploads, validate req.file instead of req.body
        const dataToValidate = req.file ? { pdf: req.file } : req.body;
        
        const { error } = schema.validate(dataToValidate);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        next();
    };
};

module.exports = validateRequest; 