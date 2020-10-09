const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class MetarCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'metar',
            group: 'aviation',
            memberName: 'metar',
            description: 'Provides the METAR of the airport requested.'
        })
    }

    async run(message, args) {
            let getMetar = async () => {
            let response = await axios.get(`https://metartaf.ru/${args}.json`)
            let metar = response.data
            return metar
        }
        let metarValue = await getMetar();
        console.log(`Metar of ${args} has been requested!`)
        console.log(metarValue);
        message.reply("```" + `\n${metarValue.metar.slice(19)}` + "\n```");
    }
}