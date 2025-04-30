const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const PDFFile = require('../models/PDFFile');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });



router.post('/send-id-card', upload.single('pdf'), async (req, res) => {
    const email = req.body.email;
    const pdfBuffer = req.file.buffer;

    if (!email || !pdfBuffer) {
        return res.status(400).json({ message: 'Email or PDF file missing.' });
      }


    const filename = `id-card-${uuidv4()}.pdf`;
  const filePath = path.join(__dirname, '..', 'uploads/', filename);


  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  try {
    // Save PDF to file system
    fs.writeFileSync(filePath, pdfBuffer);

    // Email the saved PDF
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Student ID Card',
      text: 'Attached is your generated student ID card.',
      attachments: [
        {
          filename: 'id-card.pdf',
          path: filePath,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    const newPdf = new PDFFile({
      email,
      filename,
      filePath
    });
    await newPdf.save();

    res.status(200).json({
      message: 'Email sent and PDF stored successfully!',
      savedPath: filePath
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to save or send PDF.' });
  }
});

module.exports = router;
