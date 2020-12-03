const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
const mysqlConnection = require('../../mysql/sqlconnect.js');
const authScript = require('../../util/authScript.js');

module.exports = class AuthCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'auth',
            group: 'misc',
            description: 'A command to auntificate yourself in the vEuroExpress server as a pilot',
            memberName: 'auth',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['SEND_MESSAGES'],
            guildOnly: true,
            argsType: 'multiple',
            format: 'EXP___ <Name> <Surname>',
            examples: ['!auth EXP069 John Smith'],
        });
    }

    async run(message, args) {
        const id = args[0];
        if (!id || !id.startsWith('EXP')) return message.reply('No ID specified!');
        const Pilotname = args[1];
        const Pilotsurname = args[2];
        const guildID = message.guild.id;
        const userID = message.author.id;
        if (!Pilotname || !Pilotsurname) return message.reply('Please specify your name and surname!');
        const query = `SELECT * from gvausers WHERE callsign = '${id}' and name = '${Pilotname}' and surname = '${Pilotsurname}'`;
        mysqlConnection.query(query, async function (err, res, fields) {
            if (err) throw err;
            if (!res) return message.reply('No such pilot found in our Data Base.');
            for (const userInfo of res) {
                const pilotInfo = `${userInfo.name} ${userInfo.surname} ${userInfo.callsign}`;
                await mongo().then(async mongoose => {
                    try {
                        const pilotAuth = await authScript.findOne({
                            pilotInfo
                        });

                        if (pilotAuth === null || pilotAuth.auth === false) {
                            await authScript.findOneAndUpdate({
                                pilotInfo,
                                auth: false
                            }, {
                                pilotInfo,
                                auth: true,
                                guildID,
                                userID
                            }, {
                                upsert: true,
                                useFindAndModify: false
                            });

                            message.channel.send(`${pilotInfo}, verified.`);
                            message.member.setNickname(pilotInfo);
                            const pilotRole = message.guild.roles.cache.find((role) => {
                                return role.name === 'Pilot Community';
                            });
                            if (!pilotRole) {
                                return console.log('No pilot community role found on the server!');
                            } else {
                                message.member.roles.add(pilotRole)
                            }
                        } else if (pilotAuth.auth === true) return message.reply("This pilot is already auntificated! Don't try to fool the system!");
                    } finally {
                        mongoose.connection.close();
                    }
                });
            }
        });
    }
}