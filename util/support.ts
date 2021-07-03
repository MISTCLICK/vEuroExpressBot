import { CommandoClient } from "discord.js-commando";
import supportScript from '../schema/supportScript';

export default async function handleSupport(client: CommandoClient) {
  const allSupportInstances = await supportScript.find();
  for (const instance of allSupportInstances) {
    const channel = client.channels.cache.get(instance.supportChannelID);
    if (channel) {
      //@ts-ignore
      channel.messages.fetch();
    }
  }

  client.on('messageReactionAdd', async (reaction, user) => {
    await user.fetch();
    await reaction.fetch();
    await reaction.message.fetch().then(async () => {
      const guildID = reaction.message.guild?.id;

      const supData = await supportScript.findOne({
        guildID
      });

      if (supData === null || user.bot) return;
      if (supData.supportChannelID !== null && reaction.emoji.name == '🎫' && reaction.message.channel.id === supData.supportChannelID) {
        reaction.users.remove(user);

        const categoryID = supData.categoryID;
        const supRoleID = supData.supportRoleID;

        reaction.message.guild?.channels.create(`ticket-${user.tag}-${Math.floor(Math.random() * 1000) + 100}`, {
          type: 'text'
        }).then(async channel => {
          const trueChannel = channel;
          trueChannel.setParent(categoryID).then(() => {
            trueChannel.overwritePermissions([
              {
                id: user.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                deny: ['ADD_REACTIONS']
              },
              {
                //@ts-expect-error
                id: reaction.message.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
              },
              {
                id: supRoleID,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              }
            ]);
          });

          trueChannel.send(`<@${user.id}> welcome to your support ticket. Please describe your issue as precisely as you can and we will get back to you soon.`);
        });
      }
    });
  });
}