const Discord = require('discord.js');

module.exports = {
    name: 'faq',
    description: "FAQ command",
    execute(message, args){
        const FAQembed = new Discord.MessageEmbed()
        .setColor('#00309d')
        .setAuthor('Frequently asked questions about our VA: Menu', 'https://cdn.discordapp.com/attachments/682219767230365742/745291964244688976/ava.png', 'http://veuroexpress.org')
        .setDescription('test')
        .setImage('https://cdn.discordapp.com/attachments/682219767230365742/748650255591145472/oblozhka.png')
        .setFooter('Found a bug? Report it in #support!')

        message.channel.send(FAQembed);
    }
}