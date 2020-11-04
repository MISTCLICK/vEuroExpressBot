const mongoose = require('mongoose');
// SetupType: 0 = support; 1 = rr; 2 = welcome; 3 = stats;

const welcomeScript = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    setupType: {
        type: Number,
        required: true,
    },
    welcomeChannelID: {
        type: String,
        required: true,
    },
    welcomeMessage: {
        type: String,
        required: true,
    },
    leaveChannelID: {
        type: String,
        required: true,
    },
    leaveMessage: {
        type: String,
        required: true,
    },
    entryRole: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('setupwelcome', welcomeScript);