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

    const updatePilots = (guild) => {
      const channelId = '764546853264949248';
      const channel = guild.channels.cache.get(channelId)
      const roleID = '731121390673199184';
      const PilotServerCount = guild.roles.cache.get(roleID).members.size
      channel.setName(`vEX Pilots: ${PilotServerCount}`)
    }

    client.on('guildMemberUpdate', (member) => updatePilots(member.guild));

    updatePilots(guild);
}