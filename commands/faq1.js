const Discord = require('discord.js');

module.exports = {
    name: 'faq1',
    description: "FAQ, Page 1 command",
    execute(message, args){
        const FAQ1embed = new Discord.MessageEmbed()
        .setColor('#00309d')
        .setAuthor('Frequently asked questions about our VA: Page 1', 'https://cdn.discordapp.com/attachments/682219767230365742/745291964244688976/ava.png', 'http://veuroexpress.org')
        .setDescription('test, FAQ page 1')
        .setImage('https://cdn.discordapp.com/attachments/682219767230365742/748650255591145472/oblozhka.png')
        .setFooter('Found a bug? Report it in #support!')

        message.channel.send(FAQ1embed);
    }
}