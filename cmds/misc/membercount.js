const Commando = require('discord.js-commando');

module.exports = class MemberCountCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'membercount',
            description: 'Gets the membercount of the server.',
            memberName: 'membercount',
            group: 'misc',
            aliases: ['mc'],
            guildOnly: true
        })
    }

    async run(message) {
        const membercount = message.guild.memberCount.toLocaleString()
        message.reply(`This server has ${membercount} members`);
    }
}