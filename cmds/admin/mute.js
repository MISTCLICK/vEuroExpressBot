const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
const muteScript = require('../../util/mute-script.js');

module.exports = class MuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'admin',
            memberName: 'mute',
            description: 'Mutes a user',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES', 'MUTE_MEMBERS'],
            argsType: 'multiple',
            guildOnly: true
        });
    }

    async run (message, args) {
        const target = message.mentions.users.first();
        if (!target) return;
        args.shift();

        const guildID = message.guild.id;
        const userID = target.id;
        const durationRaw = args[0];
        args.shift();
        const reason = args.join(' ');

        const duration = new Date();
        if (durationRaw.endsWith('d')) {
            const durationAI = durationRaw.slice(0, -1);
            const durationInt = parseInt(durationAI, 10);
            const durationHrs = durationInt * 24;
            duration.setHours(duration.getHours() + durationHrs);
        } else if (durationRaw.endsWith('m')) {
            const durationAI = durationRaw.slice(0, -1);
            const durationInt = parseInt(durationAI, 10);
            duration.setMinutes(duration.getMinutes() + durationInt);
        } else if (durationRaw.endsWith('h')) {
            const durationAI = durationRaw.slice(0, -1);
            const durationInt = parseInt(durationAI, 10);
            duration.setHours(duration.getHours() + durationInt);
        } else {
            return message.reply('To specify the duration of the mute please use minutes, hours or days with the following syntax:\n1m/1h/1d');
        }

        const mute = {
            author: message.member.user,
            timeStamp: new Date().getTime(),
            duration,
            reason,
        }

        await mongo().then(async mongoose => {
            try {
                const previousMutes = await muteScript.findOne({
                    guildID,
                    userID
                });

                if (previousMutes === null) {
                    const mutedRole = message.guild.roles.cache.find((role) => {
                        return role.name === 'Muted';
                    });
            
                    if (!mutedRole) {
                        message.reply('No `Muted` role found in this server.');
                    }
            
                    const targetMember = message.guild.members.cache.get(target.id);
                    targetMember.roles.add(mutedRole);
    
                    await muteScript.findOneAndUpdate({
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

                    message.reply(`${target.tag} has been muted.\nReason: ${reason}\nThey will be unmuted on: ${duration.toLocaleString()}`);
                    target.send(`You've been muted in **${message.guild}** by a moderator ${message.author} until ${duration.toLocaleString()}! Please follow the rules properly!\n\nReason: ${reason}`);
                } else {
                    let current = false;

                    const currentMute = previousMutes.current;
                    if (currentMute) {
                        current += true
                    }
                    if (current) {
                        return message.reply("This user is already muted!");
                    } else {
                        const mutedRole = message.guild.roles.cache.find((role) => {
                            return role.name === 'Muted';
                        });
                
                        if (!mutedRole) {
                            message.reply('No `Muted` role found in this server.');
                        }
                
                        const targetMember = message.guild.members.cache.get(target.id);
                        targetMember.roles.add(mutedRole);
        
                        await muteScript.findOneAndUpdate({
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

                        message.reply(`${target.tag} has been muted.\nReason: ${reason}\nThey will be unmuted on: ${duration.toLocaleString()}`);
                        target.send(`You've been muted in **${message.guild}** by a moderator ${message.author} until ${duration.toLocaleString()}! Please follow the rules properly!\n\nReason: ${reason}`);
                    }
                }
            } finally {
                mongoose.connection.close();
            }
        });

        const unmuteTime = duration.getTime();
        const currentTime = new Date().getTime();
        const time = unmuteTime - currentTime;

        setTimeout(async() => {
            const mutedRole = message.guild.roles.cache.find((role) => {
                return role.name === 'Muted';
            });
            const targetMember = message.guild.members.cache.get(target.id);
            targetMember.roles.remove(mutedRole);
            
            await mongo().then(async mongoose => {
                try {
                    await muteScript.findOneAndUpdate({
                        guildID,
                        userID,
                        current: true
                    }, {
                        guildID,
                        userID,
                        current: false,
                    }, {
                        upsert: true,
                        useFindAndModify: false,
                    });
            } finally {
                mongoose.connection.close();
            }
            });
        }, time);
    }
}