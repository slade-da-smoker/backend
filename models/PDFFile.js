const mongoose = require('mongoose');

const pdfFileSchema = new mongoose.Schema({
    email:String,
    filename: String,
    originalName: String,
    filePath: String,
    uploadDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PDFFile', pdfFileSchema);