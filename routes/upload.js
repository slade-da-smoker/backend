const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const PDFFile = require('../models/PDFFile');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/pdfs/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const pdfFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' ) {
        cb(null, true);
    } else {
        cb(new Error('Only PDFs are allowed!'), false);
    }
};

const uploadPDF = multer({storage,fileFilter: pdfFilter});

router.post('/pdf', uploadPDF.single('pdf'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({msg: 'No file uploaded or invalid format'});
    }


    res.status(200).json({
        msg: 'PDF uploaded successfully',
        path: `/uploads/pdfs/${req.file.filename}`
    });

    const newPDF = new PDFFile({
        filename: req.file.filename,
        originalName: req.file.originalname,
        filePath: `/uploads/pdfs/${req.file.filename}`,

        
    });

    await 
     newPDF.save();

    res.status(200).json({
        msg: 'PDF uploaded and saved',
        data: newPDF
    })

});

module.exports = router