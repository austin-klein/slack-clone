const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

//register and login route
router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;