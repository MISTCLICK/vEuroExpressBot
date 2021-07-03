import { CommandoClient } from 'discord.js-commando';
import statChannelScript from '../schema/statChannelScript';
import axios from 'axios';
import { baseURL } from '../config.json';

export default async function updateStats(client: CommandoClient) {
  const allStatConfigs = await statChannelScript.find();
  let stats = (await axios.get(`${baseURL}/api/stats`)).data.stats;
  
  for (const statCfg of allStatConfigs) {
    const guild = client.guilds.cache.get(statCfg.guildID);
    const channel = client.channels.cache.get(statCfg.channelID);

    if (!guild || !channel) continue;

    if (statCfg.type === 'MEMBERS') {
      //@ts-ignore
      channel.setName(`Total members: ${guild.memberCount}`);
    } else if (statCfg.type === 'totalHours') {
      //@ts-ignore
      channel.setName(`Total hours: ${stats.totalHours}`);
    } else if (statCfg.type === 'pirepStats.totalFlights') {
      //@ts-ignore
      channel.setName(`PIREPs: ${stats.pirepStats.totalFlights}`);
    } else if (statCfg.type === 'totalFleet') {
      //@ts-ignore
      channel.setName(`Fleet size: ${stats.totalFleet}`);
    } else if (statCfg.type === 'totalPilots') {
      //@ts-ignore
      channel.setName(`Total pilots: ${stats.totalPilots}`);
    } else continue;
  }
}