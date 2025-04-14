const generatePDF = require('../utils/pdfGenerator');
const sendEmailWithPDF = require('../utils/sendEmail');
const path = require('path');

exports.generateAndSendCard = async (req, res) => {
  const {passport, name, matric, faculty, program, state, blood, expect, sign, session,
    semester, level, course } = req.body;

  const pdfPath = path.join(__dirname, '../generated', `${regNo}_card.pdf`);

  try {
    await generatePDF({ passport, name, matric, faculty, program, state, blood, expect, sign, session,
        semester, level, course }, pdfPath);
    await sendEmailWithPDF(email, 'Your ID/Exam Card', 'Please find attached your card.', pdfPath);

    res.status(200).json({ msg: 'PDF generated and sent via email!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to generate or send PDF' });
  }
};
