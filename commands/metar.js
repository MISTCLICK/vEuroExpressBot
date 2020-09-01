const axios = require('axios');

module.exports = {
    name: 'metar',
    description: "Command to retreive API metar",
    async execute(message, args) {
        let getMetar = async () => {
            let response = await axios.get(`https://metartaf.ru/${args}.json`)
            let metar = response.data
            return metar
        }
        let metarValue = await getMetar();
        console.log(`Metar of ${args} has been requested!`)
        console.log(metarValue);
        message.reply("```" + `\n${metarValue.metar}` + "\n```");
    }
}