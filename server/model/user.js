const mongoose = require('mongoose');

const user = new mongoose.Schema({
    _id: String,
    last_song_id: String,
    devices: [{ ID: String }],
});

const User = mongoose.model('User', user);

module.exports = User;
