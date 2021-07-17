import { CommandoClient } from "discord.js-commando";
import { GuildMember } from "discord.js";
import welcomeScript from "../schema/welcomeScript";
import usersModel from "../schema/users";

export default (client: CommandoClient) => {
  client.on('guildMemberAdd', async (member: GuildMember) => {
    const guildID = member.guild.id;
    const data = await welcomeScript.findOne({
      guildID
    });

    const syncData = await usersModel.findOne({
      discordID: member.id
    });

    if (syncData) {
      const guild = client.guilds.cache.get(guildID);
      const pilotRole = guild?.roles.cache.find(r => r.name === 'Pilot Community');
      if (pilotRole) member.roles.add(pilotRole);
      member.setNickname(`${syncData.name} ${syncData.surname} ${syncData.callsign}`);
    }

    if (data == null) return;

    //@ts-ignore
    if (data.settingsObj.welcome.channelID) {
      //@ts-ignore
      const channel: any = client.channels.cache.get(data.settingsObj.welcome.channelID);
      //@ts-ignore
      channel?.send(`${member}, ${data.settingsObj.welcome.text}`);
      //@ts-ignore
      if (data.settingsObj.welcome.role) {
        //@ts-ignore
        member.roles.add(data.settingsObj.welcome.role);
      }
    }
  });

  client.on('guildMemberRemove', async member => {
    const guildID = member.guild.id;
    const data = await welcomeScript.findOne({
      guildID
    });

    if (data == null) return;

    //@ts-ignore
    if (data.settingsObj.leave.channelID !== null) {
      //@ts-ignore
      const channel: any = client.channels.cache.get(data.settingsObj.leave.channelID);
      //@ts-ignore
      channel?.send(`**${member.nickname || member.user.username}** ${data.settingsObj.leave.text}`);
    }
  });
}