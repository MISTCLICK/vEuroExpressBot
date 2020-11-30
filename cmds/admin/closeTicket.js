const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const { MessageAttachment } = require('discord.js');
const supportSetupScript = require('../../util/supportSetupScript.js');

module.exports = class closeTicket extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'close',
            group: 'admin',
            memberName: 'close',
            description: 'A command to close a ticket',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['CHANGE_NICKNAME', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            guildOnly: true
        });
    }

    async run(message) {
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!");
        await mongo().then(async mongoose => {
            try {
                const guildID = message.guild.id;
                const supCh = await supportSetupScript.findOne({
                    guildID,
                    setupType: 0
                });
                const logChannel = this.client.channels.cache.get(supCh.logChannelID);
                logChannel.send(`${message.author} has closed a ticket.\n${message.channel.name}`, await new MessageAttachment(path.join(__dirname.slice(0, -11), `log/support/${message.channel.name}.txt`)));
                message.channel.delete();
            } finally {
                mongoose.connection.close();
            }
        });
    }
}