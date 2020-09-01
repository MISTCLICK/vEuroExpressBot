module.exports = {
    name: 'ping',
    description: "Test command",
    execute(message, args){
        if(message.member.id === '349553169035952140' || '349553169035952140'){
            message.channel.send('pong!');
        } else {
            console.log(`${message.author.username} does not have the correct permissions to use this command!`);
        }
    }
}