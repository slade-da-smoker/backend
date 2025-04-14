const express = require('express');
const router = express.Router();
const { generateAndSendCard } = require('../controllers/cardController');

router.post('/generate-pdf', generateAndSendCard);

module.exports = router;
