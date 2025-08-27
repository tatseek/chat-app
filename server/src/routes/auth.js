// server/src/routes/auth.js
const router = require('express').Router();
const { register, login } = require('../controllers/authController');

// Temporary placeholder endpoints
router.post('/register', register);

router.post('/login', login);

module.exports = router;

