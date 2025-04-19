const express = require('express');
const router = express.Router();
const { uploadPDF, uploadPDFFile } = require('../controllers/uploadController');
const PDFFile = require('../models/PDFFile');
const validateRequest = require('../middleware/validateRequest');
const { fileUploadSchema, getPDFsSchema } = require('../validations/uploadValidation');

// POST /api/upload/image
router.post('/image', uploadPDF.single('pdf'), validateRequest(fileUploadSchema), uploadPDFFile);

// GET /api/upload/pdfs
router.get('/pdfs', validateRequest(getPDFsSchema), async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'uploadDate', order = 'desc' } = req.query;
        
        const files = await PDFFile.find()
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit);
            
        const total = await PDFFile.countDocuments();
        
        res.json({
            files,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch PDFs' });
    }
});

module.exports = router;
