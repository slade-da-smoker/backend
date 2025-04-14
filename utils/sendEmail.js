const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailWithPDF = async (to, subject, text, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP config
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Card Generator" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    attachments: [
      {
        filename: 'card.pdf',
        path: pdfPath,
      },
    ],
  });
};

module.exports = sendEmailWithPDF;
