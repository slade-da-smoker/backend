const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String }, // name of the counter
  seq: { type: Number, default: 0 } // sequence value
});

module.exports = mongoose.model('Counter', counterSchema);
