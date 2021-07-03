  
import Commando from 'discord.js-commando';
import path from 'path';
import supportSetupScript from '../../schema/supportScript';
import { MessageAttachment } from 'discord.js';

export default class closeTicket extends Commando.Command {
  constructor(client: Commando.CommandoClient) {
    super(client, {
      name: 'close',
      group: 'admin',
      memberName: 'close',
      description: 'A command to close a ticket',
      clientPermissions: ['ADMINISTRATOR'],
      guildOnly: true
    });
  }

  //@ts-ignore
  async run(message: Commando.CommandoMessage) {
    //@ts-ignore
    if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!");
    const guildID = message.guild.id;
    const supCh = await supportSetupScript.findOne({
        guildID
    });

    if (!supCh) return null;

    if (!message.member.roles.cache.has(supCh.supportRoleID)) return message.reply("Hey there! Unfortunately I can't let you use this command. To use this command you need to be a member of the support team of this server, you can always ask the admins to join though!");
    const logChannel = this.client.channels.cache.get(supCh.logChannelID);

    if (logChannel) {
      //@ts-ignore
      await logChannel.send(`${message.author} closed a ticket.\n${message.channel.name}`, await new MessageAttachment(path.join(__dirname.slice(0, -11), `log/support/${message.channel.name}.txt`)));
    }
    return message.channel.delete();
  }
}