const config = require('./config.json');
const roleClaim = require('./util/role-claim.js');
const SUPmessageChannel = require('./util/support-channel-create.js');
const MemberStatus = require('./util/memberJL.js');
const membercountStat = require('./util/statChannels.js');
const automod = require('./util/automod.js');
const mongo = require('./mongo/mongo.js');
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');

const client = new Commando.CommandoClient({
    owner: ['349553169035952140', '331528449644560405'],
    commandPrefix: config.prefix,
    invite: 'https://discord.gg/BxmjpP5'
})

client.on('ready', async () => {
    console.log(`${client.user.username} is ready to perform his duties!`);
    client.user.setActivity(`v1.2 | ${config.prefix}help`, type = 'PLAYING');

    roleClaim(client);
    SUPmessageChannel(client);
    MemberStatus(client);
    membercountStat(client);
    automod(client);
    await mongo().then(mongoose => {
        try {
            console.log("Connected to MongoDB");
        } finally {
            mongoose.connection.close();
        }
    });
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['aviation', 'Commands connected to aviation, like METAR or TAF.'],
        ['misc', 'Miscellaneous commands.'],
        ['admin', 'Commands for moderation and administration purposes.']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false,
    })
    .registerCommandsIn(path.join(__dirname, 'cmds'))

client.on('message', async function (message) {
    if (message.content.startsWith('<@') && message.content.endsWith('>') && !message.content.startsWith('<@&')) {
        const UserMention = message.mentions.users.first();
        if (UserMention.id === '748608375318905013') {
            const MenjaZvali = new Discord.MessageAttachment('./images/yes.jpg');
            message.channel.send(MenjaZvali);
        }
    }
});

client.login(config.token);