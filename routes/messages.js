const express = require('express');
const router = express.Router();
const { getMessages, newMessage } = require('../controllers/messages');
const { protect } = require('../middleware/protect');

router.route('/').get(protect, getMessages);
router.route('/').post(protect, newMessage);

module.exports = router;