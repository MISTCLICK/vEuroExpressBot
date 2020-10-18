const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
const muteScript = require('../../util/mute-script.js');

module.exports = class UnMuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'admin',
            memberName: 'unmute',
            description: 'Unmutes a muted user',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES', 'MUTE_MEMBERS'],
            argsType: 'multiple',
            guildOnly: true
        });
    }

    async run(message) {
        const target = message.mentions.users.first();
        if (!target) return;

        const guildID = message.guild.id;
        const userID = target.id;
        
        await mongo().then(async mongoose => {
            try {
                const previousMutes = await muteScript.findOne({
                    guildID,
                    userID
                });

                if (previousMutes === null) {
                    return message.reply('This user is not muted.');
                } else if (previousMutes.current) {
                    await muteScript.findOneAndUpdate({
                        guildID,
                        userID
                    }, {
                        guildID,
                        userID,
                        current: false,
                    }, {
                        upsert: true,
                        useFindAndModify: false,
                    });

                    const mutedRole = message.guild.roles.cache.find((role) => {
                        return role.name === 'Muted';
                    });
                    const targetMember = message.guild.members.cache.get(target.id);
                    targetMember.roles.remove(mutedRole);

                    message.reply(`${target.tag} has been unmuted.`);
                } else if (!previousMutes.current) {
                    return message.reply('This user is not muted.');
                } else {
                    console.error;
                }
            } finally {
                mongoose.connection.close();
            }
        });
    }
}