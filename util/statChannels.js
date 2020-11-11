const mysqlConnection = require('../mysql/sqlconnect.js');
const mongo = require('../mongo/mongo.js');
const statScript = require('./statScript.js');

module.exports = (client) => {
  const guild = client.guilds.cache.get('731107533024133121')

  const updateMembers = async (guild) => {
    await mongo().then(async mongoose => {
      try {
        const guildID = guild.id;
        const chInfo = await statScript.findOne({
          guildID
        });
        if (chInfo == null || chInfo.channelID == null) return;
        const channelId = chInfo.channelID;
        const channel = guild.channels.cache.get(channelId);
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
      } finally {
        mongoose.connection.close();
      }
    });
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild));
  client.on('guildMemberRemove', (member) => updateMembers(member.guild));

  for (let guildCache in client.guilds.cache) {
    updateMembers(guildCache);
  }

  const updatePilots = (guild, pilotcount) => {
    const channelID = '764546853264949248';
    const channel = guild.channels.cache.get(channelID);
    channel.setName(`vEX Pilots: ${pilotcount}`);
  }

  setInterval(async () => {
    let query = `SELECT * from gvausers WHERE activation = 1`;
    mysqlConnection.query(query, async (err, res, fields) => {
      if (err) throw err;
      if (!res) console.error('No pilots found. At all.');
      let pilotcount = res.length;
      updatePilots(guild, pilotcount);
    });
  }, 60000);

  const updateHours = (guild, houramount) => {
    const channelID = '768175045000036432';
    const channel = guild.channels.cache.get(channelID);
    channel.setName(`Total hours: ${houramount}`);
  }

  setInterval(async () => {
    let query = `SELECT ROUND(sum(time), 2) as gva_hours from v_total_data_flight_no_rejected`;
    mysqlConnection.query(query, async (err, res, fields) => {
      if (err) throw err;
      if (!res) console.error('No hours found. At all.');
      updateHours(guild, res[0].gva_hours);
    });
  }, 30000);
}