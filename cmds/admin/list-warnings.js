const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const mongo = require('../../mongo/mongo.js');
const warnScript = require('../../util/warn-script.js');

module.exports = class ListWarningsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'list-warnings',
            group: 'admin',
            memberName: 'list-warnings',
            description: "A command to list user's warings",
            aliases: ['lw', 'warns', 'warnings', 'listw', 'warns-list', 'warnsl'],
            guildOnly: true
        });
    }

    async run(message) {
        const target = message.mentions.users.first();
        if (!target) return;
        
        const guildID = message.guild.id;
        const userID = target.id;

        await mongo().then(async mongoose => {
            try {
                const results = await warnScript.findOne({
                    guildID,
                    userID
                });

                if (results === null) return message.reply("This user has no warnings!");

                let reasons = '';

                for (const warning of results.warnings) {
                    const { author, timeStamp, reason } = warning;

                    reasons += `By <@${author}> on ${new Date(timeStamp).toLocaleDateString()} for "${reason}"\n\n`;
                }

                const lwEmbed = new MessageEmbed()
                .setAuthor(`Previous warnings for ${target.tag}:`, 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png')
                .setColor('#00309d')
                .setDescription(reasons)
                .setFooter('Found a bug? Report it in #support', 'https://cdn.discordapp.com/attachments/760151712845004840/760153034113417246/ava.png')

                message.reply(lwEmbed)
            } finally {
                mongoose.connection.close();
            }
        });
    }
}