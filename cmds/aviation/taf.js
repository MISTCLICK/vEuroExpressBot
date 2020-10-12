const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class TafCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'taf',
            group: 'aviation',
            memberName: 'taf',
            description: 'Provides the TAF of the airport requested.',
            args: [
                {
                    key: 'airport',
                    prompt: "What airport's metar would you like to get? Please provide the code only, don't type out the command again!",
                    type: 'string',
                    validate: text => text.length === 4
                }
            ],
            argsCount: 1,
            examples: ['!taf EVRA', '!t ULLI'],
            aliases: ['t']
        });
    }

    async run(message, airport) {
            let getTAF = async () => {
            let airportString = airport.airport;
            let airportCode = airportString.toUpperCase()
            let response = await axios.get(`https://metartaf.ru/${airportCode}.json`)
            let taf = response.data
            return taf
        }
        let tafValue = await getTAF()
        .catch(console.error);
        if (tafValue) {
        console.log(`TAF of ${airport.airport} has been requested!`)
        console.log(tafValue);
        message.reply("```" + `\n${tafValue.taf.slice(19)}` + "\n```");
        } else return message.channel.send('No airport with such ICAO code was found in our Data Base, please provide a valid ICAO code next time!');
    }
}