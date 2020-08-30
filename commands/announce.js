const Discord = require('discord.js');

const client = require('/vEuroExpressBot/main.js')

const fs = require('fs');
client.AnnouncementEmbedInfo = require('./AnnouncementEmbedInfo.json');

module.exports = {
    name: 'announce',
    description: "Command that will let Mods and Admins make announcements in the correct channels",
    execute(message, args){
        if (message.member.roles.cache.has('748827786923475034')){
            message.channel.send('Please enter the title!').then(() => {
                const filter = m => message.author.id === m.author.id;

                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                .then(messages => {
                    message.channel.send(`Title: ${messages.first().content} | Please enter title URL!`).then(() => {
                        const filter = m => message.author.id === m.author.id;
                        let title = `${messages.first().content}`

                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(messages => {
                            message.channel.send(`Title URL: ${messages.first().content} | Please enter the descrition!`).then(() => {
                                const filter = m => message.author.id === m.author.id;
                                let titleURL = `${messages.first().content}`

                                message.channel.awaitMessages(filter, { time: 300000, max: 1, erros: ['time'] })
                                .then(messages => {
                                    message.channel.send(`Description: ${messages.first().content} | Please enter the footer!`).then(() => {
                                        const filter = m => message.author.id === m.author.id;
                                        let descriptionAnn = `${messages.first().content}`

                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                        .then(messages => {
                                            message.channel.send(`Footer: ${messages.first().content} | Please enter Image URL! (To have no Image enter http://veuroexpress.org as Image URL)`).then(() => {
                                                const filter = m => message.author.id === m.author.id;
                                                let Footer = `${messages.first().content}`
                                                
                                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                                .then(messages => {
                                                    message.channel.send(`Image URL: ${messages.first().content} Type anything if you would like to see embed's preview`).then(() => {
                                                        const filter = m => message.author.id = m.author.id;
                                                        let ImageURL = `${messages.first().content}`
                                                    
                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                                        .then(messages => {
                                                            const NewAnnouncementEmbed = new Discord.MessageEmbed()
                                                            .setColor('#00309d')
                                                            .setAuthor(title, 'https://cdn.discordapp.com/attachments/682219767230365742/745291964244688976/ava.png', titleURL)
                                                            .setDescription(descriptionAnn)
                                                            .setImage(ImageURL)
                                                            .setFooter(Footer)

                                                            message.channel.send(NewAnnouncementEmbed).catch(console.log.errors).then(() => {
                                                                message.channel.send('This was the preview of your announcement. To publish it type "!confirm", to cancel type "!cancel", to start over type "!announce".').then(() => {
                                                                    client.AnnouncementEmbedInfo = {
                                                                        "title": title,
                                                                        "titleURL": titleURL,
                                                                        "descriptionAnn": descriptionAnn,
                                                                        "Footer": Footer,
                                                                        "ImageURL": ImageURL
                                                                    } 
                                                                    fs.writeFile('./AnnouncementEmbedInfo.json', JSON.stringify (client.AnnouncementEmbedInfo, null, 4), err => {
                                                                        if(err){
                                                                            throw err;
                                                                        } else {
                                                                            console.log(`${message.author.username} has created an announcement, it is ready to be published!`);
                                                                        }
                                                                    });
                                                                });
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    });
                })
                .catch(() => {
                    message.channel.send('You did not enter the required information, announcement is cancelled.');
                })
            })
        } else {
            return;
        }
    }
}