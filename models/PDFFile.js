const mongoose = require('mongoose');
const router = require('../routes/upload');

router.get('/pdfs', async (req,res) => {
    try {
        const files = await pdfFileSchema.find().sort({ uploadDate: -1 });
        res.json(files);
    } catch {
        res.status(500).json({ msg: 'Failed to fetch PDFs' });
    }
} );

const pdfFileSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    filePath: String,
    uploadDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PDFFile', pdfFileSchema);