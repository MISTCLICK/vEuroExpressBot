const mongoose = require('mongoose');

const warnScript = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    warnings: {
        type: [Object],
        required: true
    }
});

module.exports = mongoose.model('warnings', warnScript);