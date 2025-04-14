const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = (userData, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    doc.fontSize(20).text('ID/Exam Card', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${userData.name}`);
    doc.text(`Reg No: ${userData.matric}`);
    doc.text(`Program of study: ${userData.program}`);
    doc.text(`Faculty: ${userData.faculty}`);
    doc.text(`Level: ${userData.level}`);
    doc.text(`Semester: ${userData.semester}`);
    doc.text(`Session: ${userData.session}`);
    doc.text(`State: ${userData.state}`);



    if (userData.image) {
      const imagePath = path.join(__dirname, '../uploads', userData.passport);
      if (fs.existsSync(imagePath)) {
        doc.image(imagePath, { fit: [100, 100], align: 'center' });
      }
    }

    doc.end();

    stream.on('finish', () => resolve(outputPath));
    stream.on('error', (err) => reject(err));
  });
};

module.exports = generatePDF;
