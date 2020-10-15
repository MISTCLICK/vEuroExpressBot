const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
const warnScript = require('../../util/warn-script.js');

module.exports = class ClearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear-warnings',
            group: 'admin',
            memberName: 'clear-warnings',
            description: "A command to clear user's warings",
            aliases: ['cw', 'warns-clear'],
        });
    }

    async run(message) {
        const target = message.mentions.users.first();
        if (!target) return;
        
        const guildID = message.guild.id;
        const userID = target.id;

        await mongo().then(async mongoose => {
            try {
                await warnScript.findOneAndRemove({
                    guildID,
                    userID
                }, {
                    useFindAndModify: false
                });
            } finally {
                mongoose.connection.close();
            }
        });
    }
}