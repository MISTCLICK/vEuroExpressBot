const Commando = require('discord.js-commando');

module.exports = class BanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban',
            description: 'A command to ban someone.',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['BAN_MEMBERS'],
            guildOnly: true
        });
    }

    async run(message, args) {
        if (!args[1]) return;
        const mention = message.content.slice(5);
        if (!mention.startsWith("<@")) return;
        const memberTag = message.mentions.users.first();
        const reasonDirty = message.content.slice(5);
        const memberString = memberTag.toString();
        const reason = reasonDirty.slice(memberString.length);
        const member = message.guild.member(memberTag);
        if (member) {
            member.send(`You have been banned from **${message.guild}** by ${message.author}\nReason: ${reason}\nUnfortunately, this is a permanent ban. If you believe, your ban was unfair, please email mistclick.a@veuroexpress.org or constact MISTCLICK#8009 in Discord, describing your ban and explaining, why should you be unbanned.`).then(() => {
                member.ban({reason: `${reason}`}).then(() => {
                    message.reply(`${memberTag} has been banned.`);
                });
            });
        }
        console.log(`${memberTag.username} has been banned by ${message.author.username}.\nReason: ${reason}`);
    }
}