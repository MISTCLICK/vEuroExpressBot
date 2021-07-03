import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import moment from 'moment';
import warnScript from '../../schema/warnScript';
import { mainColor, mainFooter } from '../../config.json';

export default class ListWarnsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'list-warnings',
      group: 'admin',
      memberName: 'list-warnings',
      description: 'Lists user\'s warnings.',
      guildOnly: true,
      userPermissions: ["MANAGE_MESSAGES"],
      aliases: ['lw']
    });
  }

  //@ts-ignore
  async run(message: CommandoMessage) {
    const targetMember = message.mentions.users.first();
    if (!targetMember) return;
    const data = await warnScript.findOne({
      guildID: message.guild.id,
      userID: targetMember.id
    });
    if (data === null) return message.reply('This user does not have any warnings.');
    let reasons = '';
    for (const warning of data.warns) {
      const { author, timeStamp, reason } = warning;
      reasons += `${moment(timeStamp).utc().format('DD.MM.YYYY | HH:mm:ss')}, Moderator: <@${author}>, Reason: "${reason}"\n\n`;
    }

    const embed = new MessageEmbed()
      .setColor(mainColor)
      .setAuthor(`Предупреждения ${targetMember.tag}:`, this.client.user?.displayAvatarURL())
      .setDescription(reasons)
      .setFooter(mainFooter)

    return message.reply(embed);
  }
}