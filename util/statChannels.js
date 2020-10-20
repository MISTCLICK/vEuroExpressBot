const mysqlConnection = require('../mysql/sqlconnect.js');

module.exports = (client) => {
    const guild = client.guilds.cache.get('731107533024133121')

    const updateMembers = (guild) => {
      const channelId = '764146717104668722'
      const channel = guild.channels.cache.get(channelId)
      channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }
  
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))
  
    updateMembers(guild)

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
}