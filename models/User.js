const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userType: String,
  faculty: String,
  admissionYear: Number,
  department: String,
  uniqueId: String,
  username: String,
  email: {type: String, unique: true},
  password: String,
  pdfs: [String],
  idCardPDF: String,
  examCardPDF: String,
  idCardPDF: String,
  uploadedPDFs: [String],
});

module.exports = mongoose.model('User', userSchema);