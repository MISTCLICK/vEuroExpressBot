const mongoose = require('mongoose');

const authScript = mongoose.Schema({
    pilotInfo: {
        type: String,
        required: true,
    },
    auth: {
        type: Boolean,
        required: true,
    },
    guildID: {
        type: String,
        required: false,
    },
    userID: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('auth', authScript);