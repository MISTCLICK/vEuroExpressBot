"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = __importDefault(require("discord.js-commando"));
const moment_1 = __importDefault(require("moment"));
const muteScript_1 = __importDefault(require("../../schema/muteScript"));
class MuteCommand extends discord_js_commando_1.default.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'admin',
            memberName: 'mute',
            description: 'Mutes a user.',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES', 'MUTE_MEMBERS'],
            argsType: 'multiple',
            guildOnly: true
        });
    }
    //@ts-ignore
    async run(message, args) {
        const target = message.mentions.users.first();
        if (!target)
            return;
        args.shift();
        const guildID = message.guild.id;
        const userID = target.id;
        const durationRaw = args[0];
        args.shift();
        const reason = args.join(' ');
        if (!durationRaw || !reason)
            return message.reply('Incorrect command arguments.');
        const duration = new Date();
        if (durationRaw.endsWith('d')) {
            const durationAI = durationRaw.slice(0, -1);
            const durationInt = parseInt(durationAI, 10);
            const durationHrs = durationInt * 24;
            duration.setHours(duration.getHours() + durationHrs);
        }
        else if (durationRaw.endsWith('m')) {
            const durationAI = durationRaw.slice(0, -1);
            const durationInt = parseInt(durationAI, 10);
            duration.setMinutes(duration.getMinutes() + durationInt);
        }
        else if (durationRaw.endsWith('h')) {
            const durationAI = durationRaw.slice(0, -1);
            const durationInt = parseInt(durationAI, 10);
            duration.setHours(duration.getHours() + durationInt);
        }
        else {
            return message.reply('Use the following units to assign a mute length:\n1m/1h/1d');
        }
        const mDur = new Date(duration).getTime();
        const mute = {
            author: message.author.id,
            timeStamp: new Date().getTime(),
            duration: mDur,
            reason,
        };
        const previousMutes = await muteScript_1.default.findOne({
            guildID,
            userID
        });
        if (previousMutes === null) {
            const mutedRole = message.guild.roles.cache.find((role) => {
                return role.name === 'Muted';
            });
            if (!mutedRole) {
                return message.reply('The `Muted` role was not found on this server.');
            }
            const targetMember = message.guild.members.cache.get(target.id);
            targetMember?.roles.add(mutedRole);
            await muteScript_1.default.findOneAndUpdate({
                guildID,
                userID,
            }, {
                guildID,
                userID,
                current: true,
                $push: {
                    mutes: mute
                }
            }, {
                upsert: true,
                useFindAndModify: false
            });
            message.reply(`${target.tag} was muted.\nReason: ${reason}\nThey will be unmuted on: ${moment_1.default(duration).utc().format('DD.MM.YYYY | HH:mm:ss')}`);
            target.send(`You were muted on the **${message.guild}** server by ${message.author} until ${moment_1.default(duration).utc().format('DD.MM.YYYY | HH:mm:ss')}!\n\nReason: ${reason}`);
        }
        else {
            let current = false;
            const currentMute = previousMutes.current;
            if (currentMute) {
                current = true;
            }
            if (current) {
                return message.reply("This user is already muted.");
            }
            else {
                const mutedRole = message.guild.roles.cache.find((role) => {
                    return role.name === 'Muted';
                });
                if (!mutedRole) {
                    return message.reply('The `Muted` role was not found on this server.');
                }
                const targetMember = message.guild.members.cache.get(target.id);
                targetMember?.roles.add(mutedRole);
                await muteScript_1.default.findOneAndUpdate({
                    guildID,
                    userID
                }, {
                    guildID,
                    userID,
                    current: true,
                    $push: {
                        mutes: mute
                    }
                }, {
                    upsert: true,
                    useFindAndModify: false
                });
                message.reply(`${target.tag} was muted.\nReason: ${reason}\nThey will be unmuted on: ${moment_1.default(duration).utc().format('DD.MM.YYYY | HH:mm:ss')}`);
                return target.send(`You were muted on the **${message.guild}** server by ${message.author} until ${moment_1.default(duration).utc().format('DD.MM.YYYY | HH:mm:ss')}!\n\nReason: ${reason}`);
            }
        }
    }
}
exports.default = MuteCommand;
