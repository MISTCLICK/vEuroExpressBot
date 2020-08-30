const client = require('/vEuroExpressBot/main.js');

const fs = require('fs');

module.exports = {
    name: 'rrmsgc',
    description: "Command for creating a reaction-role message.",
    execute(message, args){
        if(message.member.roles.cache.some(role => role.name === 'Mod')){
            message.channel.send('Please enter reaction-role message title!').then(() => {
                const filter = m => message.author.id === m.author.id;

                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                .then(messages => {
                    message.channel.send(`Title: ${messages.first().content} | Please enter the description!`).then(() => {
                        const filter = m => message.author.id === m.author.id;
                        let titleReact = `${messages.first().content}`

                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                        .then(messages => {
                            message.channel.send(`Description: ${messages.first().content} | Please enter the footer!`).then(() => {
                                const filter = m => message.author.id === m.author.id;
                                let descriptionReact = `${messages.first().content}`

                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                .then(messages => {
                                    message.channel.send(`Footer: ${messages.first().content} | Please enter the channel it will be sent to!`).then(() => {
                                        const filter = m => message.author.id === m.author.id;
                                        let FooterReact = `${messages.first().content}`

                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                        .then(messages => {
                                            message.channel.send(`Channel: ${messages.first().content} | React to this message with reactions you want to be role triggers!`).then(() => {
                                                const filter = (reaction, user) => {
                                                    return [].includes(reaction.emoji.name) && user.id === message.author.id;
                                                };
                                                let ChannelRSend = `${messages.first().content}`
                                                const channelid = ChannelRSend.slice(2, 20);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                })
                .catch(() => {
                    message.channel.send('You did not enter the required information, reaction-role message is cancelled.');
                });
            });
        } else {
            return console.log(`${message.author.username} tried do use RRMSGC command but has insufficient permissions!`)
        }
    }
}