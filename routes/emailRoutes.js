// backend/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sendEmailWithPDF } = require('../controllers/emailController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/send-email', upload.single('pdf'), sendEmailWithPDF);

module.exports = router;
