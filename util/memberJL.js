module.exports = client => {
    client.on('guildMemberAdd', async (member) => {
        const channel = client.channels.cache.get('731136189272162314')
        channel.send(`**${member.displayName}** just joined the server!\n Welcome to the EuroExpress Virtual official server! Please, read carefully our <#731125322992320532> and wait for your activation. You may DM <@331528449644560405> or <@349553169035952140> for that`);
    });
    client.on('guildMemberRemove', async (member) => {
        const channel = client.channels.cache.get('732609012884963369')
        channel.send(`**${member.displayName}** just left the server! Press F please!`);
    });
}