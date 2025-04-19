const express = require('express');
const router = express.Router();
const { uploadPDF, uploadPDFFile } = require('../controllers/uploadController');

// POST /api/upload/image
router.post('/image', uploadPDF.single('pdf'), uploadPDFFile);

module.exports = router;
