const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class MetarCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'metar',
            group: 'aviation',
            memberName: 'metar',
            description: 'Provides the METAR of the airport requested.',
            args: [
                {
                    key: 'airport',
                    prompt: "What airport's metar would you like to get?",
                    type: 'string',
                    validate: text => text.length === 4
                }
            ],
            argsCount: 1,
            examples: ['!metar EVRA', '!m ULLI'],
            aliases: ['m']
        });
    }

    async run(message, airport) {
            let getMetar = async () => {
                let airportString = airport.airport;
                let airportCode = airportString.toUpperCase();
                let metarURL = 'https://metartaf.ru/'+airportCode+'.json';
                let response = await axios.get(metarURL);
                let metar = response.data;
                return metar;
            }
        let metarValue = await getMetar()
        .catch(console.error);
        if (metarValue) {
            console.log(`Metar of ${airport.airport} has been requested!`);
            console.log(metarValue);
            message.reply("```" + `\n${metarValue.metar.slice(19)}` + "\n```");
        } else return message.channel.send('No airport with such ICAO code was found in our Data Base, please provide a valid ICAO code next time!');
    }
}