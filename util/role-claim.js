const Discord = require('discord.js');
const path = require('path')
const firstMessage = require(path.join(__dirname, 'rrmessage.js'));

module.exports = client => {
    const channelID = '764147283897745458';

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName);

    const emojis = {
        radar: 'ATC Kontrolar!',
        putinPing: 'Stream Notifications',
    }

    const reactions = []

    let emojiText = '';
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n\n`
    }
    
    const EmojiEmbed = new Discord.MessageEmbed()
    .setColor('#00309d')
    .setAuthor('Reaction roles: Menu', 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png')
    .setDescription('```\nReact to this message to get roles correspondant to the emoji\n```\n' + emojiText)
    .setFooter('Found a bug? Report it in #support!', 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png')

    firstMessage(client, channelID, EmojiEmbed, reactions);

    const handleReaction = (reaction, user, add) => {
        if (user.id === '748608375318905013') {
            return;
        }

        const emoji = reaction._emoji.name

        const { guild } = reaction.message

        const roleName = emojis[emoji]
        if (!roleName) {
            return;
        }

        const role = guild.roles.cache.find(role => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)

        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, false)
        }
    })
}