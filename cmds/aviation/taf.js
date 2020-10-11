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
                    prompt: "What airport's metar would you like to get?",
                    type: 'string',
                    validate: text => text.length === 4
                }
            ],
            argsCount: 1,
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
        let tafValue = await getTAF();
        console.log(`TAF of ${airport.airport} has been requested!`)
        console.log(tafValue);
        message.reply("```" + `\n${tafValue.taf.slice(19)}` + "\n```");
    }
}