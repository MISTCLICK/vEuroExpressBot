const Discord = require('discord.js');

const axios = require('axios');

const client = new Discord.Client();

const { prefix, token } = require('./config.json');
const roleClaim = require('./commands/role-claim.js');

const fs = require('fs');
client.AnnouncementEmbedInfo = require('./AnnouncementEmbedInfo.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('vEuroExpress is ready to perform his duties!');

    client.user.setActivity('Alpha 0.1.1 | !help', { type: 'PLAYING' });

    roleClaim(client);
});

client.on('message', async function(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args);
    } else if (command === 'faq') {
        if (!args.length) {
            return client.commands.get('faq').execute(message, args);
        } else if (args[0] === '1') {
            return client.commands.get('faq1').execute(message, args);
        }
    } else if (command === 'react') {
        client.commands.get('react').execute(message, args);
    } else if (command === 'announce') {
        client.commands.get('announce').execute(message, args);
    } else if (command === 'confirm') {
        const AnnData = fs.readFileSync('./AnnouncementEmbedInfo.json');
        const AnnInfo = JSON.parse(AnnData);
        const { title } = AnnInfo;
        const { titleURL } = AnnInfo;
        const { descriptionAnn } = AnnInfo;
        const { Footer } = AnnInfo;
        const { ImageURL } = AnnInfo;
        if (message.member.roles.cache.has('748827786923475034') && title !== null) {
            const channel = client.channels.cache.get('748873531638677564');

            const NewAnnouncementEmbed = new Discord.MessageEmbed()
                .setColor('#00309d')
                .setAuthor(title, 'https://cdn.discordapp.com/attachments/682219767230365742/745291964244688976/ava.png', titleURL)
                .setDescription(descriptionAnn)
                .setImage(ImageURL)
                .setFooter(Footer)

            channel.send('Notifying @everyone', NewAnnouncementEmbed).catch(console.log.errors);

            client.AnnouncementEmbedInfo = {
                "title": null,
                "titleURL": null,
                "descriptionAnn": null,
                "Footer": null,
                "ImageURL": null
            }
            fs.writeFile('./AnnouncementEmbedInfo.json', JSON.stringify(client.AnnouncementEmbedInfo, null, 4), err => {
                if (err) {
                    throw err;
                } else {
                    console.log(`${message.author.username} has published the announcement. JSON successfully cleared!`);
                }
            });
        } else {
            return console.log('Error in publishing the announcement, insufficient premissions or annnouncement not set up correctly!');
        }
    } else if (command === 'cancel') {
        client.commands.get('cancel').execute(message, args);
    } else if (command === 'metar') {
        client.commands.get('metar').execute(message, args);
    } else if (command === 'taf') {
        client.commands.get('taf').execute(message, args);
    }
});

client.login(token);