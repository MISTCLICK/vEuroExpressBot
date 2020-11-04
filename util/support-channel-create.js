const Discord = require('discord.js');
const mongo = require('../mongo/mongo.js');
const supportScript = require('./supportSetupScript.js');

module.exports = async client => {
    client.on('messageReactionAdd', async (reaction, user) => {
        user.fetch();
        reaction.fetch();
        reaction.message.fetch();
        const guildID = reaction.message.guild.id;

        await mongo().then(async mongoose => {
            try {
                const supCh = await supportScript.findOne({
                    guildID,
                    setupType: 0,
                });

                if (supCh === null) return;
                if (supCh.channelID !== null) {
                    const channelID = supCh.channelID;
                    const categoryID = supCh.categoryID;
                    const supRoleID = supCh.supportRoleID;
                    const supportChannel = client.channels.cache.get(channelID);
                    supportChannel.messages.fetch();
            
                    if(user.bot) return;
            
                    if(reaction.emoji.name == '🎫') {
                        reaction.users.remove(user);
            
                        reaction.message.guild.channels.create(`ticket-${user.tag}-${Math.floor(Math.random() * 1100) +100}`, {
                            type: 'text'
                        }).then(async channel => {
                            channel.setParent(categoryID);
                            channel.overwritePermissions([
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                                },
                                {
                                    id: reaction.message.guild.roles.everyone,
                                    deny: ["VIEW_CHANNEL"]
                                },
                                {
                                    id: supRoleID,
                                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                }
                            ],);
                            channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("Describe your issue and we will get back to you shortly!").setColor("00ff00"));
                        });
                    }
                }
            } finally {
                mongoose.connection.close();
            }
        });
    });
}