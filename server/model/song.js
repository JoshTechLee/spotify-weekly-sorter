const mongoose = require('mongoose');

const song = new mongoose.Schema({
    _id: String,
    artists: [
        {
            name: String,
            external_urls: String,
        },
    ],
    devices: [{ ID: String }],
});

const User = mongoose.model('User', user);

module.exports = User;
