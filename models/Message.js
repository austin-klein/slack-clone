const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: String,
    message: String,
    image: String,
    time: String,
    repeat: Boolean,
    room: String
});


module.exports = mongoose.model('messages', MessageSchema);