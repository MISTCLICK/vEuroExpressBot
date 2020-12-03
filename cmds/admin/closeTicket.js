const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
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
                if (!message.member.roles.cache.has(supCh.supportRoleID)) return message.reply("Hey there! Unfortunately I can't let you use this command. To use this command you need to be a member of the support team of this server, you can always ask the admins to join though!");
                const logChannel = this.client.channels.cache.get(supCh.logChannelID);
                logChannel.send(`${message.author} has closed a ticket.\n${message.channel.name}`, await new MessageAttachment(path.join(__dirname.slice(0, -11), `log/support/${message.channel.name}.txt`)));
                message.channel.delete();
            } finally {
                mongoose.connection.close();
            }
        });
    }
}