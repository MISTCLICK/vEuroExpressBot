"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = __importDefault(require("discord.js-commando"));
const path_1 = __importDefault(require("path"));
const supportScript_1 = __importDefault(require("../../schema/supportScript"));
const discord_js_1 = require("discord.js");
class closeTicket extends discord_js_commando_1.default.Command {
    constructor(client) {
        super(client, {
            name: 'close',
            group: 'admin',
            memberName: 'close',
            description: 'A command to close a ticket',
            clientPermissions: ['ADMINISTRATOR'],
            guildOnly: true
        });
    }
    //@ts-ignore
    async run(message) {
        //@ts-ignore
        if (!message.channel.name.includes("ticket-"))
            return message.channel.send("You cannot use that here!");
        const guildID = message.guild.id;
        const supCh = await supportScript_1.default.findOne({
            guildID
        });
        if (!supCh)
            return null;
        if (!message.member.roles.cache.has(supCh.supportRoleID))
            return message.reply("Hey there! Unfortunately I can't let you use this command. To use this command you need to be a member of the support team of this server, you can always ask the admins to join though!");
        const logChannel = this.client.channels.cache.get(supCh.logChannelID);
        if (logChannel) {
            //@ts-ignore
            await logChannel.send(`${message.author} closed a ticket.\n${message.channel.name}`, await new discord_js_1.MessageAttachment(path_1.default.join(__dirname.slice(0, -11), `log/support/${message.channel.name}.txt`)));
        }
        return message.channel.delete();
    }
}
exports.default = closeTicket;
