const Commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

module.exports = class CancelAnnounceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'cancel',
            group: 'admin',
            memberName: 'cancel',
            description: 'A command to cancel the publication of the annoucnement.',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_WEBHOOKS', 'MANAGE_MESSAGES', 'MENTION_EVERYONE'],
            guildOnly: true
        });
    }

    async run(message) {
            this.client.annInfo = {
                "title": null,
                "titleURL": null,
                "descriptionAnn": null,
                "imageURL": null,
                "footer": null,
                "annChannel": null
                }
                fs.writeFileSync(path.join(__dirname.slice(0, -11), 'json/annInfo.json'), JSON.stringify (this.client.annInfo, null, 4), err => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(`${message.author.username} cancelled announcement's creation, all variables have been successfully cleared.`);
            }
        });
    }
}