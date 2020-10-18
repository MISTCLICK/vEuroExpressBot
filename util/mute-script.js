const mongoose = require('mongoose');

const muteScript = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    current: {
        type: Boolean,
        required: true,
    },
    mutes: {
        type: [Object],
        required: true,
    }
});

module.exports = mongoose.model('mutes', muteScript);