const express = require('express');
const router = express.Router();
const { generateAndSendCard } = require('../controllers/cardController');
const validateRequest = require('../middleware/validateRequest');
const { cardGenerationSchema } = require('../validations/cardValidation');

router.post('/generate-pdf', validateRequest(cardGenerationSchema), generateAndSendCard);

module.exports = router;
