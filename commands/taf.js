const axios = require('axios');

module.exports = {
    name: 'taf',
    description: "Command to retreive API TAF",
    async execute(message, args) {
        let getTAF = async () => {
            let response = await axios.get(`https://metartaf.ru/${args}.json`)
            let taf = response.data
            return taf;
        }
        let tafValue = await getTAF();
        console.log(`TAF of ${args} has been requested!`)
        console.log(tafValue);
        message.reply("```\n" + `\n${tafValue.taf}` + "\n```");
    }
}