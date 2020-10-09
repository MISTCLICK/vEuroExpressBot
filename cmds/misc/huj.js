const Commando = require('discord.js-commando');

module.exports = class HUJCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'huj',
            group: 'misc',
            memberName: 'huj',
            description: 'Testing command of sorts.',
            hidden: true,
            unknown: true,
        })
    }

    async run(msg) {
        console.log(`${msg.author.username} tried to use an unknown command, message content: ${msg.content}`);
    }
}