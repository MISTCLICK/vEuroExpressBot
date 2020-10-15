const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class InfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            group: 'misc',
            memberName: 'info',
            aliases: ['i'],
            description: 'Command that displays primary info about the bot.'
        });
    }

    async run(message) {
        const infoEmbed = new MessageEmbed()
            .setColor('#00309d')
            .setAuthor('vEuroExpress Discord Bot', '', 'http://veuroexpress.org')
            .setDescription("Version 1.1\n\n **What is my purpose?**\n\n The purpose of this bot is to provide useful information to this server's members and help staff manage it. Use !help to find out what I can do.\n\n **About the project.**\n\n The vEuroExpress bot is custom-made by <@349553169035952140>\n The bot is written in JavaScript and is open-source.\n [You can find the source code on GitHub](https://github.com/MISTCLICK/vEuroExpressBot)\n\n **Bug to report?**\n\n Report any bug by opening a support ticket in <#731145091783327815>\n\n **Author**\n\n <@349553169035952140>\n *Currently running from a server.*")
            .setFooter('Found a bug? Report it in #support!')
            .setImage('https://cdn.discordapp.com/attachments/760151712845004840/760801232989716510/oblozhka_1.png')
        
        message.channel.send(infoEmbed);
    }
}