const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const config = require(path.join(__dirname.slice(0, -11), 'config.json'));

module.exports = class AnnounceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            aliases: ['ann'],
            group: 'admin',
            memberName: 'announce',
            description: 'A command to make an "embed" announcement in the server.',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_WEBHOOKS', 'MANAGE_MESSAGES', 'MENTION_EVERYONE'],
            guildOnly: true
        });
    }

    async run(message) {
        message.reply("You are now fixed to this announcement's creation, please provide the title of the announcement, you have 1 minute to do so!").then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                .then(messages => {
                    message.channel.send('```\n' + `Announcement's title:\n ${messages.first().content}\n Please provide the URL to make the title clickable\n` + '```').then(() => {
                        const title = messages.first().content

                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                            .then(messages => {
                            message.channel.send('```\n' + `Announcement's title URL:\n ${messages.first().content}\n Please provide the announcement's description, you have 5 minutes to do so!\n` + '```').then(() => {
                            const titleURL = messages.first().content

                            message.channel.awaitMessages(filter, { time: 300000, max: 1, errors: ['time'] })
                                .then(messages => {
                                message.channel.send('```\n' + `Announcement's description:\n ${messages.first().content}\n Please provide the announcement's footer\n` + '```').then(() => {
                                const descriptionAnn = messages.first().content

                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                .then(messages => {
                                    message.channel.send('```\n' + `Announcement's footer:\n ${messages.first().content}\n Please provide the announcement's image URL, if you don't want your announcement to include an image, use "http://veuroexpress.org"\n` + '```').then(() => {
                                    const footer = messages.first().content

                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                    .then(messages => {
                                        message.channel.send('```\n' + `Announcement's image:\n ${messages.first().content}\n You can see the preview of the announcement below. Please tag the channel you want the announcement to be published in.\n` + '```').then(() => {
                                        const imageURL = messages.first().content

                                        const AnnouncementEmbed = new Discord.MessageEmbed()
                                            .setColor('#00309d')
                                            .setAuthor(title, 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png', titleURL)
                                            .setDescription(descriptionAnn)
                                            .setImage(imageURL)
                                            .setFooter(footer, 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png');

                                            message.channel.send(AnnouncementEmbed);

                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                            .then(messages => {
                                                const annChannel = messages.first().content.slice(2, -1);
                                                message.channel.send('```\n' + `Announcement channel: ${annChannel}\n Type ${config.prefix}confirm to publish the announcement or ${config.prefix}cancel to cancel the announcement's creation.\n` + '```').then(() => {
                                                    this.client.annInfo = {
                                                        "title": title,
                                                        "titleURL": titleURL,
                                                        "descriptionAnn": descriptionAnn,
                                                        "imageURL": imageURL,
                                                        "footer": footer,
                                                        "annChannel": annChannel
                                                        }
                                                        fs.writeFileSync(path.join(__dirname.slice(0, -11), 'json/annInfo.json'), JSON.stringify (this.client.annInfo, null, 4), err => {
                                                            if (err) {
                                                                throw err;
                                                            } else {
                                                                console.log(`${message.author.username} created an announcement template, all variables have been successfully stored.`);
                                                            }
                                                        });
                                                    });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
        .catch(() => {
            message.channel.send("You did not enter the required information, announcement's creation is cancelled");
        });
    }
}