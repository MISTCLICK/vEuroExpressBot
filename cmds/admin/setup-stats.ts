import Commando from 'discord.js-commando';
import statChannelScript from '../../schema/statChannelScript';
import axios from 'axios';
import { baseURL } from '../../config.json';

export default class SetupCommand extends Commando.Command {
  constructor(client: Commando.CommandoClient) {
    super(client, {
      name: 'setup-stats',
      group: 'admin',
      memberName: 'setup-stats',
      description: 'Setup process for the sever closed VC stats.',
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_MESSAGES'],
      guildOnly: true
    });
  }

  async run(message: Commando.CommandoMessage) {
    let stats = (await axios.get(`${baseURL}/stats`)).data.stats;

    const { guild } = message;
    guild.channels.create(`Total pilots: ${stats.totalPilots}`, {
      type: 'voice'
    }).then(async channel => {
      channel.overwritePermissions([
        {
          id: guild.roles.everyone,
          deny: ['CONNECT'],
          allow: ['VIEW_CHANNEL']
        },
      ]);
      const channelID = channel.id;
      await statChannelScript.findOneAndUpdate({
        guildID: guild.id,
        type: 'totalPilots'
      }, {
        guildID: guild.id,
        channelID,
        type: 'totalPilots'
      }, {
        upsert: true,
        useFindAndModify: false
      });
    });

    guild.channels.create(`Fleet size: ${stats.totalFleet}`, {
      type: 'voice'
    }).then(async channel => {
      channel.overwritePermissions([
        {
          id: guild.roles.everyone,
          deny: ['CONNECT'],
          allow: ['VIEW_CHANNEL']
        },
      ]);
      const channelID = channel.id;
      await statChannelScript.findOneAndUpdate({
        guildID: guild.id,
        type: 'totalFleet'
      }, {
        guildID: guild.id,
        channelID,
        type: 'totalFleet'
      }, {
        upsert: true,
        useFindAndModify: false
      });
    });

    guild.channels.create(`PIREPs: ${stats.pirepStats.totalFlights}`, {
      type: 'voice'
    }).then(async channel => {
      channel.overwritePermissions([
        {
          id: guild.roles.everyone,
          deny: ['CONNECT'],
          allow: ['VIEW_CHANNEL']
        },
      ]);
      const channelID = channel.id;
      await statChannelScript.findOneAndUpdate({
        guildID: guild.id,
        type: 'pirepStats.totalFlights'
      }, {
        guildID: guild.id,
        channelID,
        type: 'pirepStats.totalFlights'
      }, {
        upsert: true,
        useFindAndModify: false
      });
    });

    guild.channels.create(`Total hours: ${stats.totalHours}`, {
      type: 'voice'
    }).then(async channel => {
      channel.overwritePermissions([
        {
          id: guild.roles.everyone,
          deny: ['CONNECT'],
          allow: ['VIEW_CHANNEL']
        },
      ]);
      const channelID = channel.id;
      await statChannelScript.findOneAndUpdate({
        guildID: guild.id,
        type: 'totalHours'
      }, {
        guildID: guild.id,
        channelID,
        type: 'totalHours'
      }, {
        upsert: true,
        useFindAndModify: false
      });
    });

    guild.channels.create(`Total members: ${message.guild.memberCount}`, {
      type: 'voice'
    }).then(async channel => {
      channel.overwritePermissions([
        {
          id: guild.roles.everyone,
          deny: ['CONNECT'],
          allow: ['VIEW_CHANNEL']
        },
      ]);
      const channelID = channel.id;
      await statChannelScript.findOneAndUpdate({
        guildID: guild.id,
        type: 'MEMBERS'
      }, {
        guildID: guild.id,
        channelID,
        type: 'MEMBERS'
      }, {
        upsert: true,
        useFindAndModify: false
      });
    });

    return message.reply('Setup successful.');
  }
}


