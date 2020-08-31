const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const { prefix, token } = require('./config.json');

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

    client.user.setActivity('Alpha 0.1.0 | !help', { type: 'PLAYING' });
});

client.on('message', async message => {
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
    } else if (command === 'reaction-role-msg-create') {
        if (!args.length) {
            const ReactRoleData = fs.readFileSync('./ReactRoles.json');
            const ReactRoles = JSON.parse(ReactRoleData);
            const { R1 } = ReactRoles;
            if (R1 != null) {
                const ReactRoleData = fs.readFileSync('./ReactRoles.json');
                const ReactRoles = JSON.parse(ReactRoleData);
                const { R1 } = ReactRoles;
                const { R2 } = ReactRoles;
                const { R3 } = ReactRoles;
                const { R4 } = ReactRoles;
                const { R5 } = ReactRoles;
                const { R6 } = ReactRoles;
                const { R7 } = ReactRoles;
                const { R8 } = ReactRoles;
                const { R9 } = ReactRoles;
                const { R10 } = ReactRoles;

                if (message.member.roles.cache.some(role => role.name === 'Mod')) {
                    const ReactionRoleEmbed = new Discord.MessageEmbed()
                        .setColor('#00309d')
                        .setAuthor('vEuroExpress Reaction Roles', 'https://cdn.discordapp.com/attachments/682219767230365742/745291964244688976/ava.png', 'http://veuroexpress.org/')
                        .setDescription('```Click on the reactions below to get correspondant roles!```')
                        .setFooter('Found a but? Report it in #support!')
                    let RREmbed = await message.channel.send(ReactionRoleEmbed);
                    RREmbed.react(R1);
                    RREmbed.react(R2);
                    RREmbed.react(R3);
                    RREmbed.react(R4);
                    RREmbed.react(R5);
                    RREmbed.react(R6);
                    RREmbed.react(R7);
                    RREmbed.react(R8);
                    RREmbed.react(R9);
                    RREmbed.react(R10)
                }
            } else {
                return console.log('No reactions were found!')
            }
        } else if (args[0] === 'assign-roles') {
            return client.commands.get('rrmsgc').execute(message, args);
        } else if (args[0] === 'assign') {
            return client.commands.get('rrea').execute(message, args);
        }

    }
});

client.on('MessageReactionAdd', async (reaction, user) => {
    const ReactRoleRData = fs.readFileSync('./ReactRolesR.json');
    const ReactRolesR = JSON.parse(ReactRoleRData);
    const { RR1 } = ReactRolesR;
    const { RR2 } = ReactRolesR;
    const { RR3 } = ReactRolesR;
    const { RR4 } = ReactRolesR;
    const { RR5 } = ReactRolesR;
    const { RR6 } = ReactRolesR;
    const { RR7 } = ReactRolesR;
    const { RR8 } = ReactRolesR;
    const { RR9 } = ReactRolesR;
    const { RR10 } = ReactRolesR;

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.client) return;
    if (!reaction.message.guild) return;

    if(reaction.message.channel.id === '749562537724608543'){
        if (reaction.emoji.name === R1){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR1);
        } else if (reaction.emoji.name === R2){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR2);
        } else if (reaction.emoji.name === R3){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR3);
        } else if (reaction.emoji.name === R4){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR4);
        } else if (reaction.emoji.name === R5){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR5);
        } else if (reaction.emoji.name === R6){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR6);
        } else if (reaction.emoji.name === R7){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR7);
        } else if (reaction.emoji.name === R8){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR8);
        } else if (reaction.emoji.name === R9){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR9);
        } else if (reaction.emoji.name === R10){
            await reaction.message.guild.members.cache.get(user.id).roles.add(RR10);
        }
    }
})
 

client.login(token);