const mongoose = require('mongoose');
// SetupType: 0 = support; 1 = rr; 2 = welcome; 3 = stats;

const supportScript = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    setupType: {
        type: Number,
        required: true,
    },
    channelID: {
        type: String,
        required: true,
    },
    categoryID: {
        type: String,
        required: true
    },
    supportRoleID: {
        type: String,
        required: true
    },
    logChannelID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('setupsupport', supportScript);