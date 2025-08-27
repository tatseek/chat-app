// server/src/routes/message.js
const router = require('express').Router();
const { getMessages } = require('../controllers/messageController');

// Temporary placeholder endpoint
router.get('/:userid', getMessages);

module.exports = router;

