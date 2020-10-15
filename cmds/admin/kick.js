const Commando = require('discord.js-commando');

module.exports = class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: 'A command to kick someone.',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['KICK_MEMBERS']
        });
    }

    async run(message, args) {
        if (!args[1]) return;
        const mention = message.content.slice(6);
        if (!mention.startsWith("<@")) return;
        const memberTag = message.mentions.users.first();
        const reasonDirty = message.content.slice(6);
        const memberString = memberTag.toString();
        const reason = reasonDirty.slice(memberString.length);
        const member = message.guild.member(memberTag);
        if (member) {
            member.send(`You have been kicked from **${message.guild}** by ${message.author}\nReason: ${reason}\nIf you wish to join back, you may do so in 24 hrs, but keep in mind that following the rules is obligatory and next time it will be a permaban!`).then(() => {
                member.kick(reason).then(() => {
                    message.reply(`${memberTag} has been kicked.`);
                });
            });
        }
        console.log(`${memberTag.username} has been kicked by ${message.author.username}.\nReason: ${reason}`);
    }
}