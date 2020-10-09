const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class TafCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'taf',
            group: 'aviation',
            memberName: 'taf',
            description: 'Provides the TAF of the airport requested.'
        })
    }

    async run(message, args) {
                let getTAF = async () => {
            let response = await axios.get(`https://metartaf.ru/${args}.json`)
            let taf = response.data
            return taf
        }
        let tafValue = await getTAF();
        console.log(`TAF of ${args} has been requested!`)
        console.log(tafValue);
        message.reply("```" + `\n${tafValue.taf.slice(19)}` + "\n```");
    }
}