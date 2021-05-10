const mongoose = require('mongoose');

const song = new mongoose.Schema({
    _id: String,
    artists: [
        {
            name: String,
            external_urls: String,
        },
    ],
    duration_ms: Number,
    explicit: Boolean,
    devices: [{ ID: String }],
    added_to_playlists: [{ id: String }],
});

const User = mongoose.model('User', user);

module.exports = User;
