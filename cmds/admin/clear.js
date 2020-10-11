const Commando = require('discord.js-commando');

module.exports = class ClearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'admin',
            memberName: 'clear',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES'],
            description: 'A command to clear a load of messages.',
            aliases: ['clr', 'c'],
            argsCount: 1
        });
    }

    async run(message, args) {
        message.channel.bulkDelete(args, true)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages.`));
    }
}