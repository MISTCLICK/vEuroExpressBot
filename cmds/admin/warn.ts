import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import warnScript from '../../schema/warnScript';

export default class WarnCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'warn',
      group: 'admin',
      memberName: 'warn',
      description: 'Warns a user.',
      clientPermissions: ["ADMINISTRATOR"],
      userPermissions: ["MANAGE_MESSAGES"],
      argsType: "multiple",
      guildOnly: true
    });
  }

  //@ts-ignore
  async run(message: CommandoMessage, args: string[]) {
    const targetMember = message.mentions.users.first();
    if (!targetMember) return;
    args.shift();
    const reason = args.join(' ');
    const guildID = message.guild.id;
    const userID = targetMember.id;
    if (reason == '') return message.reply('Please provide a reason.');
    const warn = {
      author: message.author.id,
      timeStamp: new Date().getTime(),
      reason
    }

    await warnScript.findOneAndUpdate({
      guildID,
      userID
    }, {
      guildID,
      userID,
      $push: {
        warns: warn
      }
    }, {
      upsert: true
    });

    targetMember.send(`Hi! Moderator **${message.author.username}** warned you on the **${message.guild.name}** server for: \`${reason}\``);
    return message.reply(`Warning for ${targetMember} issues successfully! Reason: ${reason}`);
  }
}