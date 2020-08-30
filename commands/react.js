module.exports = {
    name: 'react',
    description: "Adding a reaction to a message",
    execute(message, args){
        if (!args.length) {
            return message.channel.send('No arguments provided!');
        } else if(args[0] === 'scared') {
            return message.react('748614633396502569');
        } else if(args[0] === 'stalin') {
            return message.react('748840646646824970');
        } 
    }
}   