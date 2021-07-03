"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const warnScript_1 = __importDefault(require("../../schema/warnScript"));
class WarnCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            group: 'admin',
            memberName: 'warn',
            description: 'Warns a user.',
            clientPermissions: ["ADMINISTRATOR"],
            userPermissions: ["MANAGE_MESSAGES"],
            argsType: "multiple",
            guildOnly: true
        });
    }
    //@ts-ignore
    async run(message, args) {
        const targetMember = message.mentions.users.first();
        if (!targetMember)
            return;
        args.shift();
        const reason = args.join(' ');
        const guildID = message.guild.id;
        const userID = targetMember.id;
        if (reason == '')
            return message.reply('Please provide a reason.');
        const warn = {
            author: message.author.id,
            timeStamp: new Date().getTime(),
            reason
        };
        await warnScript_1.default.findOneAndUpdate({
            guildID,
            userID
        }, {
            guildID,
            userID,
            $push: {
                warns: warn
            }
        }, {
            upsert: true
        });
        targetMember.send(`Hi! Moderator **${message.author.username}** warned you on the **${message.guild.name}** server for: \`${reason}\``);
        return message.reply(`Warning for ${targetMember} issues successfully! Reason: ${reason}`);
    }
}
exports.default = WarnCommand;
