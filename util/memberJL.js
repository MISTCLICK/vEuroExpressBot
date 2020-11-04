const mongo = require('../mongo/mongo.js');
const welcomeScript = require('./welcomeScript.js');

module.exports = client => {
    client.on('guildMemberAdd', async (member) => {
        const guildID = member.guild.id;
        await mongo().then(async mongoose => {
            try {
                const welcomeInfo = await welcomeScript.findOne({
                    guildID
                });
                if (welcomeInfo == null) return;

                const channel = client.channels.cache.get(welcomeInfo.welcomeChannelID);
                if (welcomeInfo.welcomeMessage == null) return;
                channel.send(`**${member}** ${welcomeInfo.welcomeMessage}`);

                if (welcomeInfo.entryRole !== null) {
                    let role = welcomeInfo.entryRole.slice(3, -1);
                    member.roles.add(role);
                }
            } finally {
                mongoose.connection.close();
            }
        });
    });
    client.on('guildMemberRemove', async (member) => {
        const guildID = member.guild.id;
        await mongo().then(async mongoose => {
            try {
                const welcomeInfo = await welcomeScript.findOne({
                    guildID
                });
                if (welcomeInfo == null) return;

                const channel = client.channels.cache.get(welcomeInfo.leaveChannelID);
                if (welcomeInfo.leaveMessage == null) return;
                channel.send(`**${member}** ${welcomeInfo.leaveMessage}`);
            } finally {
                mongoose.connection.close();
            }
        });
    });
}