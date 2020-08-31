const client = require('/vEuroExpressBot/main.js')

const fs = require('fs');
client.ReactRoles = require('./ReactRoles.json');

module.exports = {
    name: 'rrea',
    description: "Command for assigning reactions to a reaction-role message.",
    execute(message, args){
        if(message.member.roles.cache.has('748827786923475034')){
            message.channel.send('Please send the 1st emoji that you would like to have as reaction-role!').then(() => {
                const filter = m => message.author.id === m.author.id;

                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                .then(messages => {
                    message.channel.send(`1st emoji: ${messages.first().content} | Please enter the 2nd emoji!`).then(() => {
                        let R1F = `${messages.first().content}`
                        const R1 = R1F.slice(1, -1);
                        
                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                        .then(messages => {
                            message.channel.send(`2nd emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                let R2F = `${messages.first().content}`
                                const R2 = R2F.slice(1, -1);
                                
                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                .then(messages => {
                                    if(`${messages.first().content}` === 'Y'){
                                        message.channel.send(`Please enter the 3rd emoji!`).then(() => {

                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                            .then(messages => {
                                                message.channel.send(`3rd emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                                    let R3F = `${messages.first().content}`
                                                    const R3 = R3F.slice(1, -1);

                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                    .then(messages => {
                                                        if(`${messages.first().content}` === 'Y'){
                                                            message.channel.send(`Please enter the 4th emoji!`).then(() => {

                                                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                .then(messages => {
                                                                    message.channel.send(`4th emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                                                        let R4F = `${messages.first().content}`
                                                                        const R4 = R4F.slice(1, -1);

                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                        .then(messages => {
                                                                            if(`${messages.first().content}` === 'Y'){
                                                                                message.channel.send(`Please enther the 5th emoji!`).then(() => {

                                                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                    .then(messages => {
                                                                                        message.channel.send(`5th emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                                                                            let R5F = `${messages.first().content}`
                                                                                            const R5 = R5F.slice(1, -1);

                                                                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                            .then(messages => {
                                                                                                if(`${messages.first().content}` === 'Y'){
                                                                                                    message.channel.send('Please enter the 6th emoji!').then(() => {

                                                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                        .then(messages => {
                                                                                                            message.channel.send(`6th emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                                                                                                let R6F = `${messages.first().content}`
                                                                                                                const R6 = R6F.slice(1, -1);

                                                                                                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                .then(messages => {
                                                                                                                    if(`${messages.first().content}` === 'Y'){
                                                                                                                        message.channel.send('Please enter the 7th emoji!').then(() => {

                                                                                                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                            .then(messages => {
                                                                                                                                message.channel.send(`7th emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                                                                                                                    let R7F = `${messages.first().content}`
                                                                                                                                    const R7 = R7F.slice(1, -1);

                                                                                                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                    .then(messages => {
                                                                                                                                        if(`${messages.first().content}` === 'Y'){
                                                                                                                                            message.channel.send('Please enter the 8th emoji!').then(() => {

                                                                                                                                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                .then(messages => {
                                                                                                                                                    message.channel.send(`8th emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                                                                                                                                        let R8F = `${messages.first().content}`
                                                                                                                                                        const R8 = R8F.slice(1, -1);

                                                                                                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                        .then(messages => {
                                                                                                                                                            if(`${messages.first().content}` === 'Y'){
                                                                                                                                                                message.channel.send('Please send the 9th emoji!').then(() => {

                                                                                                                                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                                    .then(messages => {
                                                                                                                                                                        message.channel.send(`9th emoji: ${messages.first().content} | Would you like to add more emojis? Type Y if yes, type N if no.`).then(() => {
                                                                                                                                                                            let R9F = `${messages.first().content}`
                                                                                                                                                                            const R9 = R9F.slice(1, -1);

                                                                                                                                                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                                            .then(messages => {
                                                                                                                                                                                if(`${messages.first().content}` === 'Y'){
                                                                                                                                                                                    message.channel.send('Please send the 10th emoji! Please note that 10 react-roles per message is the limit that the bot can handle.').then(() => {

                                                                                                                                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                                                        .then(messages => {
                                                                                                                                                                                            message.channel.send(`10th emoji: ${messages.first().content} | This is the last emoji slot per-message available.`).then(() => {
                                                                                                                                                                                                let R10F = `${messages.first().content}`
                                                                                                                                                                                                const R10 = R10F.slice(1, -1);

                                                                                                                                                                                                client.ReactRoles = {
                                                                                                                                                                                                    "R1": R1,
                                                                                                                                                                                                    "R2": R2,
                                                                                                                                                                                                    "R3": R3,
                                                                                                                                                                                                    "R4": R4,
                                                                                                                                                                                                    "R5": R5,
                                                                                                                                                                                                    "R6": R6,
                                                                                                                                                                                                    "R7": R7,
                                                                                                                                                                                                    "R8": R8,
                                                                                                                                                                                                    "R9": R9,
                                                                                                                                                                                                    "R10": R10
                                                                                                                                                                                                }
                                                                                                                                                                                                fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                                                                    if(err){
                                                                                                                                                                                                        throw err;
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                        console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 10`)
                                                                                                                                                                                                    }
                                                                                                                                                                                                })
                                                                                                                                                                                            })
                                                                                                                                                                                        })
                                                                                                                                                                                    })
                                                                                                                                                                                } else {
                                                                                                                                                                                    client.ReactRoles = {
                                                                                                                                                                                        "R1": R1,
                                                                                                                                                                                        "R2": R2,
                                                                                                                                                                                        "R3": R3,
                                                                                                                                                                                        "R4": R4,
                                                                                                                                                                                        "R5": R5,
                                                                                                                                                                                        "R6": R6,
                                                                                                                                                                                        "R7": R7,
                                                                                                                                                                                        "R8": R8,
                                                                                                                                                                                        "R9": R9,
                                                                                                                                                                                        "R10": null
                                                                                                                                                                                    }
                                                                                                                                                                                    fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                                                        if(err){
                                                                                                                                                                                            throw err;
                                                                                                                                                                                        } else {
                                                                                                                                                                                            console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 9`)
                                                                                                                                                                                        }
                                                                                                                                                                                    })
                                                                                                                                                                                }
                                                                                                                                                                            })
                                                                                                                                                                        })
                                                                                                                                                                    })
                                                                                                                                                                })
                                                                                                                                                            } else {
                                                                                                                                                                client.ReactRoles = {
                                                                                                                                                                    "R1": R1,
                                                                                                                                                                    "R2": R2,
                                                                                                                                                                    "R3": R3,
                                                                                                                                                                    "R4": R4,
                                                                                                                                                                    "R5": R5,
                                                                                                                                                                    "R6": R6,
                                                                                                                                                                    "R7": R7,
                                                                                                                                                                    "R8": R8,
                                                                                                                                                                    "R9": null,
                                                                                                                                                                    "R10": null
                                                                                                                                                                }
                                                                                                                                                                fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                                    if(err){
                                                                                                                                                                        throw err;
                                                                                                                                                                    } else {
                                                                                                                                                                        console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 8`)
                                                                                                                                                                    }
                                                                                                                                                                })
                                                                                                                                                            }
                                                                                                                                                        })
                                                                                                                                                    })
                                                                                                                                                })
                                                                                                                                            })
                                                                                                                                        } else {
                                                                                                                                            client.ReactRoles = {
                                                                                                                                                "R1": R1,
                                                                                                                                                "R2": R2,
                                                                                                                                                "R3": R3,
                                                                                                                                                "R4": R4,
                                                                                                                                                "R5": R5,
                                                                                                                                                "R6": R6,
                                                                                                                                                "R7": R7,
                                                                                                                                                "R8": null,
                                                                                                                                                "R9": null,
                                                                                                                                                "R10": null
                                                                                                                                            }
                                                                                                                                            fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                if(err){
                                                                                                                                                    throw err;
                                                                                                                                                } else {
                                                                                                                                                    console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 7`)
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                })
                                                                                                                            })
                                                                                                                        })
                                                                                                                    } else {
                                                                                                                        client.ReactRoles = {
                                                                                                                            "R1": R1,
                                                                                                                            "R2": R2,
                                                                                                                            "R3": R3,
                                                                                                                            "R4": R4,
                                                                                                                            "R5": R5,
                                                                                                                            "R6": R6,
                                                                                                                            "R7": null,
                                                                                                                            "R8": null,
                                                                                                                            "R9": null,
                                                                                                                            "R10": null
                                                                                                                        }
                                                                                                                        fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                            if(err){
                                                                                                                                throw err;
                                                                                                                            } else {
                                                                                                                                console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 6`)
                                                                                                                            }
                                                                                                                        })
                                                                                                                    }
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                } else {
                                                                                                    client.ReactRoles = {
                                                                                                        "R1": R1,
                                                                                                        "R2": R2,
                                                                                                        "R3": R3,
                                                                                                        "R4": R4,
                                                                                                        "R5": R5,
                                                                                                        "R6": null,
                                                                                                        "R7": null,
                                                                                                        "R8": null,
                                                                                                        "R9": null,
                                                                                                        "R10": null
                                                                                                    }
                                                                                                    fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                        if(err){
                                                                                                            throw err;
                                                                                                        } else {
                                                                                                            console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 5`)
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            } else {
                                                                                client.ReactRoles = {
                                                                                    "R1": R1,
                                                                                    "R2": R2,
                                                                                    "R3": R3,
                                                                                    "R4": R4,
                                                                                    "R5": null,
                                                                                    "R6": null,
                                                                                    "R7": null,
                                                                                    "R8": null,
                                                                                    "R9": null,
                                                                                    "R10": null
                                                                                }
                                                                                fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                    if(err){
                                                                                        throw err;
                                                                                    } else {
                                                                                        console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 4`)
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        } else {
                                                            client.ReactRoles = {
                                                                "R1": R1,
                                                                "R2": R2,
                                                                "R3": R3,
                                                                "R4": null,
                                                                "R5": null,
                                                                "R6": null,
                                                                "R7": null,
                                                                "R8": null,
                                                                "R9": null,
                                                                "R10": null
                                                            }
                                                            fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                if(err){
                                                                    throw err;
                                                                } else {
                                                                    console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 3`)
                                                                }
                                                            })
                                                        }
                                                    })
                                                })
                                            })
                                        })
                                    } else {
                                        client.ReactRoles = {
                                            "R1": R1,
                                            "R2": R2,
                                            "R3": null,
                                            "R4": null,
                                            "R5": null,
                                            "R6": null,
                                            "R7": null,
                                            "R8": null,
                                            "R9": null,
                                            "R10": null
                                        }
                                        fs.writeFile('./ReactRoles.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                            if(err){
                                                throw err;
                                            } else {
                                                console.log(`Reaction roles emojis were assigned by ${message.author.username}. Amount: 2`)
                                            }
                                        })
                                    }
                                })
                            })
                        })
                    })
                })
                .catch(error => {
                    message.channel.send('You did not enter the required information, emoji assgnment cancelled.');
                    console.log(error);
                })
            })
        } else {
            return console.log(`${message.author.username} tried to assign reaction roles without having sufficient permissions.`);
        }
    }
}