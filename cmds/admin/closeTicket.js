const Commando = require('discord.js-commando');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const { MessageAttachment } = require('discord.js');

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
        message.channel.messages.fetch().then(async fetchedMessages => {
            let finalArr = [];

            const pushToArray = async data => finalArr.push(data);
            const handleTime = (timestamp) => {
                let time = moment(timestamp).utc();
                let m3time = time.format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM");
                return m3time;
            }
            
            for (const message of fetchedMessages.array().reverse()) await pushToArray(`${message.author.username} at ${handleTime(message.createdTimestamp)} => "${message.content}"`);

            for (let i = 0; i < finalArr.length; i++) {
                fs.appendFileSync(path.join(__dirname.slice(0, -11), `log/support/${message.channel.name}.txt`), `${finalArr[i]}\n`, async err => {
                    if (err) throw err;
                });
            }
        }).then(async ()=> {
            const logChannel = this.client.channels.cache.get('764524163310157834');
            logChannel.send(`${message.author} has closed a ticket.\n${message.channel.name}`, await new MessageAttachment(path.join(__dirname.slice(0, -11), `log/support/${message.channel.name}.txt`)));
            message.channel.delete();
        });
    }
}