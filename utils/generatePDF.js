const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


exports.generateIDCardPDF = (data, passportPath, signaturePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', chunk => buffers.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      const filePath = `uploads/id-${Date.now()}.pdf`;
      fs.writeFileSync(filePath, pdfBuffer); // Save the PDF file
      resolve(filePath);
    });

    doc.fontSize(20).text('Student ID Card', { align: 'center' });

    if (fs.existsSync(passportPath)) {
      doc.image(passportPath, 50, 100, { width: 100 });
    }

    doc.text(`Name: ${data.name}`, 200, 100);
    doc.text(`Reg No: ${data.regNo}`);
    doc.text(`Program: ${data.program}`);
    doc.text(`Faculty: ${data.faculty}`);
    doc.text(`State: ${data.state}`);
    doc.text(`Blood Group: ${data.bloodGroup}`);
    doc.text(`Grad Year: ${data.graduationYear}`);

    if (fs.existsSync(signaturePath)) {
      doc.image(signaturePath, 200, 250, { width: 100 });
    }

    doc.end();
  });
};

exports.generateExamCardPDF = (data, userImagePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', chunk => buffers.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      const filePath = `uploads/exam-${Date.now()}.pdf`;
      fs.writeFileSync(filePath, pdfBuffer); // Save the PDF file
      resolve(filePath);
    });

    doc.fontSize(20).text('Exam Card', { align: 'center' });

    if (fs.existsSync(userImagePath)) {
      doc.image(userImagePath, 50, 100, { width: 100 });
    }

    doc.text(`Name: ${data.name}`, 200, 100);
    doc.text(`Reg No: ${data.regNo}`);
    doc.text(`Faculty: ${data.faculty}`);
    doc.text(`Department: ${data.department}`);
    doc.text(`Semester: ${data.semester}`);
    doc.text(`Session: ${data.session}`);
    doc.text(`Course: ${data.course}`);
    doc.text(`Level: ${data.level}`);
    doc.text(`Date: ${data.date}`);

    doc.moveDown().text('Courses:', { underline: true });
    data.courses.forEach((c, i) => {
      doc.text(`${i + 1}. ${c.course} - ${c.title} (${c.unit} units) | Sign: ${c.sign}`);
    });

    doc.end();
  });
};