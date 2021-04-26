const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: String,
    url: String,
    color: String
});


module.exports = mongoose.model('rooms', RoomSchema);