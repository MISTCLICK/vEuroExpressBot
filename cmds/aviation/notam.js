const Commando = require('discord.js-commando');
const axios = require('axios');
const { notamkey } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = class NOTAMcommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'notam',
            group: 'aviation',
            memberName: 'notam',
            description: 'A command to get NOTAM of a certain airport.',
            args: [
                {
                    key: 'airport',
                    prompt: "What airport's metar would you like to get?",
                    type: 'string',
                    validate: text => text.length === 4
                }
            ],
            argsCount: 1,
            examples: ['!notam EVRA']
        });
    }

    async run(message, airport) {
        let getNOTAM = async () => {
            let airportString = airport.airport;
            let airportCode = airportString.toUpperCase();
            let NOTAMURL = `https://applications.icao.int/dataservices/api/notams-realtime-list?api_key=${notamkey}&format=&criticality=&locations=${airportCode}`;
            let notams = await axios.get(NOTAMURL);
            return notams;
        }
        let notamValue = await getNOTAM()
        .catch(console.error);
        for (const notam of notamValue.data) {
            const notamember = new MessageEmbed()
            .setColor('#00309d')
            .setAuthor(`NOTAM for ${airport.airport.toUpperCase()}`, this.client.user.displayAvatarURL(), 'http://veuroexpress.org')
            .setDescription(notam.all)
            .setFooter('Found a bug? Report it in #support', this.client.user.displayAvatarURL())

            message.author.send(notamember);
        }

        if (notamValue.data[0].all) {
            message.reply('sent you a DM with information.');
        }
    }
}