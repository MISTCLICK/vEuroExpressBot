import { MessageCollector, MessageEmbed } from 'discord.js';
import { mainColor, mainFooter } from '../../config.json';
import Commando from 'discord.js-commando';
import supportScript from '../../schema/supportScript';


export default class SetupCommand extends Commando.Command {
  constructor(client: Commando.CommandoClient) {
    super(client, {
      name: 'setup-support',
      group: 'admin',
      memberName: 'setup-support',
      description: 'Setup process for the support tickets.',
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_MESSAGES'],
      guildOnly: true
    });
  }

  //@ts-ignore
  async run(message: Commando.CommandoMessage) {
    const questions = [
      'Tag the ticket channel.',
      'Tag the tech-support role.',
      'Tag the ticket logging channel.',
      'Enter the ticket category ID.'
    ];
    let counter = 0;
    const guildID = message.guild.id;
    const filter = (m: Commando.CommandoMessage) => m.author.id === message.author.id;
    const collector = new MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 1000 * 120
    });

    message.channel.send(questions[counter++]);
    collector.on('collect', async m => {
      if (counter < questions.length) {
        m.channel.send(questions[counter++]);
      }
    });

    collector.on('end', async collected => {
      const collectedArr = collected.array();
      if (collectedArr.length < questions.length) return message.reply('Not enough information provided.');
      const supportChannelID = collectedArr[0].content.slice(2, -1);
      const supportRoleID = collectedArr[1].content.slice(3, -1);
      const logChannelID = collectedArr[2].content.slice(2, -1);
      const categoryID = collectedArr[3].content;

      const supportChannel: any = this.client.channels.cache.get(supportChannelID);
      const supEmbed = new MessageEmbed()
        .setColor(mainColor)
        .setAuthor('Tech support ticket system', this.client.user?.displayAvatarURL(), 'https://veuroexpress.org')
        .setDescription('```React to this message to open a support ticket.```')
        .setFooter(mainFooter, this.client.user?.displayAvatarURL())
      
      supportChannel?.send(supEmbed).then(async (m: Commando.CommandoMessage) => m.react('🎫'));

      await supportScript.findOneAndUpdate({
        guildID
      }, {
        guildID,
        supportChannelID,
        supportRoleID,
        logChannelID,
        categoryID
      }, {
        upsert: true,
        useFindAndModify: false
      });

      return message.reply('Setup successfully finished.');
    });
  }
}


