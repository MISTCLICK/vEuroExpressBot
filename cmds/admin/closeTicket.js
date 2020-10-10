const Commando = require('discord.js-commando');

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
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        message.channel.delete()

        const logChannel = this.client.channels.cache.get('764524163310157834');
        logChannel.send(`${message.author.tag} has closed a ticket.\n ${message.channel.name}`)
    }
}