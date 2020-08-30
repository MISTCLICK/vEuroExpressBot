module.exports = {
    name: 'ping',
    description: "Test command",
    execute(message, args){
        if(message.member.roles.cache.has('748827786923475034')){
            message.channel.send('pong!');
        } else {
            message.channel.send('You do not have the correct permissions to use this command!');
        }
    }
}