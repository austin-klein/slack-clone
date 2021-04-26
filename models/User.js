const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        reqired: true
    },

    image: {
        type: String,
        required: true
    }
});

// hashing password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// checking password for login
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// assigning jwt token
UserSchema.methods.getToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30min' })
}

module.exports = mongoose.model("User", UserSchema)