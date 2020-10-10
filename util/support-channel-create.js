const Discord = require('discord.js');
const fs = require('fs');
const path = require('path')

module.exports = client => {
    const supportChannelData = fs.readFileSync(path.join(__dirname.slice(0, -5), 'json/supportChannel.json'));
    const supportChannelInfo = JSON.parse(supportChannelData);
    const { channelID } = supportChannelInfo;

    const SupportChannel = client.channels.cache.get(channelID);
    SupportChannel.messages.fetch()

    client.on('messageReactionAdd', async (reaction, user) => {
        if (!SupportChannel) return;

        user.fetch();
        reaction.fetch();
        reaction.message.fetch();

        if(user.bot) return;

        if(reaction.emoji.name == 'RandomEmoji') {
            reaction.users.remove(user);

            reaction.message.guild.channels.create(`ticket-${user.tag}-${Math.floor(Math.random() * 1100) +100}`, {
                type: 'text'
            }).then(async channel => {
                let categoryID = '764146326539075645'
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
                        id: '731119211115708426',
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ],)
                channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("Describe your issue and we will get back to you shortly!").setColor("00ff00"));
            });
        }
    });
}