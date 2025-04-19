const multer = require('multer');
const path = require('path');
const PDFFile = require('../models/PDFFile');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/pdfs';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Sanitize filename
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, `${Date.now()}-${sanitizedFilename}`);
    }
});

const pdfFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype !== 'application/pdf') {
        cb(new Error('Only PDF files are allowed!'), false);
        return;
    }
    
    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
        cb(new Error('File must have .pdf extension!'), false);
        return;
    }
    
    cb(null, true);
};

// Configure multer with limits
const uploadPDF = multer({
    storage: storage,
    fileFilter: pdfFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 1 // Only allow one file at a time
    }
});

const uploadPDFFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded or invalid format' });
    }

    try {
        const newPDF = new PDFFile({
            filename: req.file.filename,
            originalName: req.file.originalname,
            filePath: `/uploads/pdfs/${req.file.filename}`,
        });

        await newPDF.save();

        res.status(200).json({
            msg: 'PDF uploaded and saved',
            data: newPDF
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error saving PDF', error: error.message });
    }
};

module.exports = {
    uploadPDF,
    uploadPDFFile
}; 