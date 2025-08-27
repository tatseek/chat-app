// server/src/routes/user.js
const router = require('express').Router();
const { getUsers } = require('../controllers/userController');

// Temporary placeholder endpoint
router.get('/', getUsers);

module.exports = router;

