const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
const warnScript = require('../../util/warn-script.js');

module.exports = class WarnCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            description: 'A command to warn a member',
            memberName: 'warn',
            group: 'admin',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES', 'MANAGE_NICKNAMES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            argsType: "multiple",
            guildOnly: true
        });
    }

    async run(message, args) {
        const target = message.mentions.users.first();
        if (!target) return;
        args.shift();

        const guildID = message.guild.id;
        const userID = target.id;
        const reason = args.join(' ');

        const warning = {
            author: message.member.user,
            timeStamp: new Date().getTime(),
            reason
        }

        await mongo().then(async mongoose => {
            try {
                await warnScript.findOneAndUpdate({
                    guildID,
                    userID
                }, {
                    guildID,
                    userID,
                    $push: {
                        warnings: warning
                    }
                }, {
                    upsert: true,
                    useFindAndModify: false
                });
            } finally {
                mongoose.connection.close();
            }
        });

        message.reply(`${target.tag} has been warned!\nReason: ${reason}`);
        target.send(`You have been warned in **${message.guild}** by a moderator ${message.author}! Please follow the rules properly!\n\nReason: ${reason}`);
    }
}