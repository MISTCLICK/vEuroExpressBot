const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

module.exports = class ReactionMessageCreateCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'sch',
            group: 'admin',
            memberName: 'sch',
            description: 'A command to create a ticket message',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_CHANNELS'],
            args: [
                {
                    key: 'channel',
                    prompt: 'What channel would you like the message to appear in?',
                    type: 'string',
                },
            ],
        });
    }

    async run(message, {channel}) {
        const channelID = channel.slice(2, -1);
        const SUPchannel = this.client.channels.cache.get(channelID);
        let schEmbed = await SUPchannel.send(new Discord.MessageEmbed()
        .setColor('#00309d')
        .setAuthor('Support Ticket system', 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png', 'http://veuroexpress.org')
        .setDescription('Press the reaction below to open a new ticket!')
        );

        schEmbed.react('764150827526782977');

        this.client.supportChannel = {
            "channelID": channelID
        }
        fs.writeFileSync(path.join(__dirname.slice(0, -11), 'json/supportChannel.json'), JSON.stringify (this.client.supportChannel, null, 4), err => {
            if (err) {
                throw err;
            } else {
                console.log(`${message.author.username} created a support channel - the channel specified is: ${SUPchannel.toString()}`);
            }
        })
    }
}