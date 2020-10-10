module.exports = client => {
    client.on('guildMemberAdd', async (member) => {
        const channel = client.channels.cache.get('731136189272162314')
        channel.send(`**${member.displayName}**` +  ' just joined the server!\nWelcome to the EuroExpress Virtual official server! Please, read carefully our <#731125322992320532> and wait for your activation. You may DM `Grigorii A EXP001` or `Artur Vasiljev EXP008` for that');

        member.roles.add('731130774442737807')
    });
    client.on('guildMemberRemove', async (member) => {
        const channel = client.channels.cache.get('732609012884963369')
        channel.send(`**${member.displayName}** just left the server! Press F please!`);
    });
}