"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
class BanCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban',
            description: 'Bans a user from the server.',
            userPermissions: ['BAN_MEMBERS'],
            argsType: 'multiple'
        });
    }
    async run(message, args) {
        const target = message.mentions.users.first();
        if (!target)
            return message.reply('User not found.');
        args.shift();
        const reason = args.join(' ');
        if (reason == '')
            return message.reply('Please provide a reason.');
        const targetMember = message.guild.members.cache.get(target.id);
        if (!targetMember)
            return message.reply('User not found.');
        await target.send(`You were banned from the **${message.guild.name}** server by **${message.author.username}** for: \`${reason}\``);
        targetMember.ban({ reason: reason });
        return message.reply(`${target.username} was successfully banned.`);
    }
}
exports.default = BanCommand;
