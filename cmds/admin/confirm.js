const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

module.exports = class ConfirmAnnounceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'confirm',
            group: 'admin',
            memberName: 'confirm',
            description: 'A command to cofirm the publication of the annoucnement.',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_WEBHOOKS', 'MANAGE_MESSAGES', 'MENTION_EVERYONE'],
            guildOnly: true
        });
    }

    async run(message) {
        const annData = fs.readFileSync(path.join(__dirname.slice(0, -11), 'json/annInfo.json'));
        const annInfo = JSON.parse(annData);
        const { title, titleURL, descriptionAnn, imageURL, footer, annChannel } = annInfo;
        if (title !== null) {
            const channel = this.client.channels.cache.get(annChannel);
            const AnnouncementEmbed = new Discord.MessageEmbed()
            .setColor('#00309d')
            .setAuthor(title, 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png', titleURL)
            .setDescription(descriptionAnn)
            .setImage(imageURL)
            .setFooter(footer, 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png');

            channel.send('Notifying @everyone', AnnouncementEmbed).catch(console.log.errors);
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
                        console.log(`${message.author.username} published an announcement, all variables have been successfully cleared.`);
                    }
                });
        }
    }
}