const express = require('express');
const router = express.Router();
const { uploadPDF, uploadPDFFile } = require('../controllers/uploadController');
const PDFFile = require('../models/PDFFile');

// POST /api/upload/image
router.post('/image', uploadPDF.single('pdf'), uploadPDFFile);

// GET /api/upload/pdfs
router.get('/pdfs', async (req, res) => {
    try {
        const files = await PDFFile.find().sort({ uploadDate: -1 });
        res.json(files);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch PDFs' });
    }
});

module.exports = router;
