const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../controllers/userController');

// Route to get user by email
router.get('/:email', getUserByEmail);

module.exports = router;
