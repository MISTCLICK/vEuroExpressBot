const config = require('../config.json');

module.exports = client => {
    client.on('message', async function(message) {
        let badWords = ['fuck', 'shit', 'ass', 'suka'];
        let pirateWords = ['piracy', 'crack', 'pirating'];
        for (const key of badWords) {
            if (message.content.includes(key) && !message.content.startsWith(config.prefix) && !message.author.bot) {
                const Remoji = client.emojis.cache.find(emoji => emoji.name === 'atata');
                message.react(Remoji);
                message.channel.send(`${message.author} do not swear please!`);
            }
        }
        for (const key of pirateWords) {
            if (message.content.includes(key) && !message.content.startsWith(config.prefix) && !message.author.bot) {
                message.delete();
                message.reply('do not mention any form of piracy on this server,\nit is against ToS and rules of the following companies:\nEuroExpress VA LTD, VATSIM, Discord');
            }
        }
    });
}