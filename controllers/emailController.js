const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { generateIDCardPDF, generateExamCardPDF } = require('../utils/generatePDF');
const User = require('../models/User');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


exports.sendEmailWithPDF = async (req, res) => {

  if (!req.file || !req.body.email) {
    return res.status(400).json({ message: 'PDF file or email missing.' });
  }

const { email } = req.body;
  const pdfBuffer = req.file.buffer;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your PDF Document',
    text: 'Find your attached document.',
    attachments: [
      {
        filename: 'generated-document.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};



exports.handleIDCard = async (req, res) => {


    
  try {
    const { name, regNo, program, faculty, state, bloodGroup, graduationYear, email } = req.body;
    const passport = req.files['passport'][0];
    const signature = req.files['signature'][0];
    const extraPDFs = req.files['pdfs'] || [];
    

    const pdfPath = await generateIDCardPDF({ name, regNo, program, faculty, state, bloodGroup, graduationYear }, passport.path, signature.path);
    console.log('Generated PDF at:', pdfPath);
    await User.create({
        name, regNo, email, program, faculty, state, bloodGroup, graduationYear,
        passport: passport.path,
        signature: signature.path,
        idCardPDF: pdfPath,
        pdfs: extraPDFs.map(f => f.path)
      });

    const attachments = [
      { filename: 'id-card.pdf', path: pdfPath },
      ...extraPDFs.map(file => ({ filename: file.originalname, path: file.path }))
    ];

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Student ID Card',
      text: 'Attached is your generated student ID card.',
      attachments
    });

    res.status(200).json({ message: 'ID card sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

exports.handleExamCard = async (req, res) => {
  try {
    const { name, regNo, faculty, department, semester, session, course, level, date, email } = req.body;
    const userImage = req.files['userImage'][0];
    const extraPDFs = req.files['pdfs'] || [];
    const courses = JSON.parse(req.body.courses);

    const pdfPath = await generateExamCardPDF({
      name, regNo, faculty, department, semester, session, course, level, date, courses
    }, userImage.path);

    await User.create({
        name, regNo, faculty, department, semester, session, course, level, date, courses,
        userImage: userImage.path,
        examCardPDF: pdfPath,
        pdfs: extraPDFs.map(f => f.path)
      });

    const attachments = [
      { filename: 'exam-card.pdf', path: pdfPath },
      ...extraPDFs.map(file => ({ filename: file.originalname, path: file.path }))
    ];

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Exam Card',
      text: 'Attached is your generated exam card.',
      attachments
    });

    res.status(200).json({ message: 'Exam card sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

// backend/controllers/emailController.js



