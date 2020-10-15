const { MessageAttachment } = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');

module.exports = class WideCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'wide',
            group: 'misc',
            memberName: 'wide',
            description: 'Easter Egg! LOL!',
            hidden: true,
            ownerOnly: true
        });
    }

    async run(message) {
        let imageIndex = Math.floor(Math.random() * 3)
        if (imageIndex === 1) {
        const image = new MessageAttachment(path.join(__dirname.slice(0, -9), '/images/wideQ400.png'));
        message.channel.send(image);
        } else if (imageIndex === 2) {
            const image = new MessageAttachment(path.join(__dirname.slice(0, -9), '/images/wideMST.png'));
            message.channel.send(image);
        } else if (imageIndex === 0) {
            const image = new MessageAttachment(path.join(__dirname.slice(0, -9), '/images/wideGrigorii.png'));
            message.channel.send(image);
        } else return console.error;
    }
}