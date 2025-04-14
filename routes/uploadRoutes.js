const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// POST /api/upload/image
router.post('/image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
  res.status(200).json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});

module.exports = router;
