import { CommandoClient, CommandoMessage } from "discord.js-commando";
import { MessageReaction, User, MessageEmbed } from "discord.js";
import rrScript, { rrInt } from "../schema/reactionRoleScript";

export default async function handleReactionRoles(client: CommandoClient) {
  const allRrInstances = await rrScript.find();
  for (const instance of allRrInstances) {
    const channel = client.channels.cache.get(instance.channelID);
    if (channel) {
      //@ts-ignore
      channel.messages.fetch();
    }
  }

  async function handleReaction(reaction: MessageReaction, user: User, add: boolean) {
    await user.fetch();
    await reaction.fetch();
    await reaction.message.fetch().then(async () => {
      const { guild } = reaction.message;

      if (!guild || user.bot) return;

      const rrData = await rrScript.findOne({ guildID: guild.id });

      if (!rrData) return;

      const roleSetting = rrData.reactions.find(r => r.emoji === `<:${reaction.emoji.name}:${reaction.emoji.id}>` || r.emoji === reaction.emoji.name);

      if (!roleSetting) return;

      const reqRole = guild.roles.cache.get(roleSetting.role_id);
      const reqMember = guild.members.cache.find((member) => member.id === user.id);

      if (!reqRole || !reqMember) return;
      
      if (add) {
        return reqMember.roles.add(reqRole);
      } else {
        return reqMember.roles.remove(reqRole);
      }
    });
  }

  function updateReactionRoles(rrData: rrInt) {
    const channel = client.channels.cache.get(rrData.channelID);
    if (!channel) return;

    let emojiText = '';
    for (const reaction of rrData.reactions) {
      emojiText += `${reaction.emoji} - <@&${reaction.role_id}>\n\n`
    }

    const rrEmbed = new MessageEmbed()
      .setColor('#00309d')
      .setAuthor('Reaction roles: Menu', client.user?.displayAvatarURL())
      .setDescription('```\nReact to this message to get roles correspondant to the emoji\n```\n' + emojiText)
      .setFooter('Found a bug? Report it in #support!', client.user?.displayAvatarURL())

    //@ts-ignore
    channel.messages.fetch().then((msgs) => {
      if (msgs.size === 0) {
        //@ts-ignore
        channel.send(rrEmbed).then((msg: CommandoMessage) => {
          for (const reaction of rrData.reactions) {
            setTimeout(() => msg.react(reaction.emoji), 750);
          }
        });
      } else {
        for (const msg of msgs) {
          msg[1].edit(rrEmbed);
          for (const reaction of rrData.reactions) {
            setTimeout(() => msg[1].react(reaction.emoji), 750);
          }
        }
      }
    });
  }

  client.on('updateReactionRoles', async (guildID?: string) => {
    if (guildID) {
      const rrData = await rrScript.findOne({ guildID });
      if (!rrData) return;
      updateReactionRoles(rrData);
    } else {
      const allData = await rrScript.find();
      for (const rrData of allData) {
        updateReactionRoles(rrData);
      }
    }
  });

  client.on('messageReactionAdd', async (reaction, user) => {
    await handleReaction(reaction, user, true);
  });

  client.on('messageReactionRemove', async (reaction, user) => {
    await handleReaction(reaction, user, false);
  });
}