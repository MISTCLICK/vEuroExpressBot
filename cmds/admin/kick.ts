import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

class KickCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'kick',
      group: 'admin',
      memberName: 'kick',
      description: 'Kicks a user from the server.',
      userPermissions: ['KICK_MEMBERS'],
      argsType: "multiple"
    });
  }

  async run(message: CommandoMessage, args: String[]) {
    const target = message.mentions.users.first();
    if (!target) return message.reply('User not found.');
    args.shift();
    const reason = args.join(' ');
    if (reason == '') return message.reply('Please provide a reason.');
    const targetMember = message.guild.members.cache.get(target.id);
    if (!targetMember) return message.reply('User not found.');
    await target.send(`You were kicked from the **${message.guild.name}** server by **${message.author.username}** for: \`${reason}\``);
    targetMember.kick(reason);
    return message.reply(`${target.username} was successfully kicked.`);
  }
}

export default KickCommand;