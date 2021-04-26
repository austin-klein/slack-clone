const mongoose = require('mongoose');
const User = require('../models/User');

//register logic
exports.register = async (req, res, next) => {
    const { username, password, image } = req.body;

    try {
        const user = await User.create({
            username, password, image
        });

        sendToken(user, 201, res);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

//login logic
exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({
            success: false,
            error: 'Need Username and Password'
        })
    }

    try {
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            res.status(404).json({
                success: false,
                error: 'Invalid Credentials'
            })
        };

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            res.status(401).json({
                success: false,
                error: 'Invalid Credentials'
            })
        };

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

// function for getting JWT token
const sendToken = (user, statusCode, res) => {
    const token = user.getToken();
    res.status(statusCode).json({
        success: true,
        token
    });
};