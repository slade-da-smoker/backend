const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../validations/authValidation');

router.post('/signup', validateRequest(registerSchema), signup);
router.post('/login', validateRequest(loginSchema), login);

module.exports = router;
