const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: "Command to output an Embed with helpful information about the VA",
    execute(message, args){
        const HelpEmbed = new Discord.MessageEmbed()
        .setColor('#00309d')
        .setAuthor('The usage of the Bot and all necessary info is listed below!', 'https://cdn.discordapp.com/attachments/682219767230365742/745291964244688976/ava.png', 'http://veuroexpress.org')
        .setDescription('test')
        .setImage('https://cdn.discordapp.com/attachments/682219767230365742/748650255591145472/oblozhka.png')
        .setFooter('You can also follow us on https://twitter.com/vEuroExpress')

        message.channel.send(HelpEmbed);
    }
}