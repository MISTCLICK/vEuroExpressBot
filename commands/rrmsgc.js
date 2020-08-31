const client = require('/vEuroExpressBot/main.js')

const fs = require('fs');
client.ReactRoles = require('./ReactRolesR.json');

module.exports = {
    name: 'rrmsgc',
    description: "Command for assigning roles to a reaction-role message.",
    execute(message, args){
        if(message.member.roles.cache.has('748827786923475034')){
            message.channel.send('Please send the 1st role that you would like to have as reaction-role!').then(() => {
                const filter = m => message.author.id === m.author.id;

                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                .then(messages => {
                    message.channel.send(`1st role: ${messages.first().content} | Please enter the 2nd role!`).then(() => {
                        let RR1F = `${messages.first().content}`
                        const RR1 = RR1F.slice(3, -1);
                        
                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                        .then(messages => {
                            message.channel.send(`2nd role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                let RR2F = `${messages.first().content}`
                                const RR2 = RR2F.slice(3, -1);
                                
                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                .then(messages => {
                                    if(`${messages.first().content}` === 'Y'){
                                        message.channel.send(`Please enter the 3rd role!`).then(() => {

                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                            .then(messages => {
                                                message.channel.send(`3rd role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                                    let RR3F = `${messages.first().content}`
                                                    const RR3 = RR3F.slice(3, -1);

                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                    .then(messages => {
                                                        if(`${messages.first().content}` === 'Y'){
                                                            message.channel.send(`Please enter the 4th role!`).then(() => {

                                                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                .then(messages => {
                                                                    message.channel.send(`4th role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                                                        let RR4F = `${messages.first().content}`
                                                                        const RR4 = RR4F.slice(3, -1);

                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                        .then(messages => {
                                                                            if(`${messages.first().content}` === 'Y'){
                                                                                message.channel.send(`Please enther the 5th role!`).then(() => {

                                                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                    .then(messages => {
                                                                                        message.channel.send(`5th role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                                                                            let RR5F = `${messages.first().content}`
                                                                                            const RR5 = RR5F.slice(3, -1);

                                                                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                            .then(messages => {
                                                                                                if(`${messages.first().content}` === 'Y'){
                                                                                                    message.channel.send('Please enter the 6th role!').then(() => {

                                                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                        .then(messages => {
                                                                                                            message.channel.send(`6th role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                                                                                                let RR6F = `${messages.first().content}`
                                                                                                                const RR6 = RR6F.slice(3, -1);

                                                                                                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                .then(messages => {
                                                                                                                    if(`${messages.first().content}` === 'Y'){
                                                                                                                        message.channel.send('Please enter the 7th role!').then(() => {

                                                                                                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                            .then(messages => {
                                                                                                                                message.channel.send(`7th role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                                                                                                                    let RR7F = `${messages.first().content}`
                                                                                                                                    const RR7 = RR7F.slice(3, -1);

                                                                                                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                    .then(messages => {
                                                                                                                                        if(`${messages.first().content}` === 'Y'){
                                                                                                                                            message.channel.send('Please enter the 8th role!').then(() => {

                                                                                                                                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                .then(messages => {
                                                                                                                                                    message.channel.send(`8th role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                                                                                                                                        let RR8F = `${messages.first().content}`
                                                                                                                                                        const RR8 = RR8F.slice(3, -1);

                                                                                                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                        .then(messages => {
                                                                                                                                                            if(`${messages.first().content}` === 'Y'){
                                                                                                                                                                message.channel.send('Please send the 9th role!').then(() => {

                                                                                                                                                                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                                    .then(messages => {
                                                                                                                                                                        message.channel.send(`9th role: ${messages.first().content} | Would you like to add more roles? Type Y if yes, type N if no.`).then(() => {
                                                                                                                                                                            let RR9F = `${messages.first().content}`
                                                                                                                                                                            const RR9 = RR9F.slice(3, -1);

                                                                                                                                                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                                            .then(messages => {
                                                                                                                                                                                if(`${messages.first().content}` === 'Y'){
                                                                                                                                                                                    message.channel.send('Please send the 10th role! Please note that 10 react-roles per message is the limit that the bot can handle.').then(() => {

                                                                                                                                                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                                                                                                                                                                                        .then(messages => {
                                                                                                                                                                                            message.channel.send(`10th role: ${messages.first().content} | This is the last role slot per-message available.`).then(() => {
                                                                                                                                                                                                let RR10F = `${messages.first().content}`
                                                                                                                                                                                                const RR10 = RR10F.slice(3, -1);

                                                                                                                                                                                                client.ReactRoles = {
                                                                                                                                                                                                    "RR1": RR1,
                                                                                                                                                                                                    "RR2": RR2,
                                                                                                                                                                                                    "RR3": RR3,
                                                                                                                                                                                                    "RR4": RR4,
                                                                                                                                                                                                    "RR5": RR5,
                                                                                                                                                                                                    "RR6": RR6,
                                                                                                                                                                                                    "RR7": RR7,
                                                                                                                                                                                                    "RR8": RR8,
                                                                                                                                                                                                    "RR9": RR9,
                                                                                                                                                                                                    "RR10": RR10
                                                                                                                                                                                                }
                                                                                                                                                                                                fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                                                                    if(err){
                                                                                                                                                                                                        throw err;
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                        console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 10`)
                                                                                                                                                                                                    }
                                                                                                                                                                                                })
                                                                                                                                                                                            })
                                                                                                                                                                                        })
                                                                                                                                                                                    })
                                                                                                                                                                                } else {
                                                                                                                                                                                    client.ReactRoles = {
                                                                                                                                                                                        "RR1": RR1,
                                                                                                                                                                                        "RR2": RR2,
                                                                                                                                                                                        "RR3": RR3,
                                                                                                                                                                                        "RR4": RR4,
                                                                                                                                                                                        "RR5": RR5,
                                                                                                                                                                                        "RR6": RR6,
                                                                                                                                                                                        "RR7": RR7,
                                                                                                                                                                                        "RR8": RR8,
                                                                                                                                                                                        "RR9": RR9,
                                                                                                                                                                                        "RR10": null
                                                                                                                                                                                    }
                                                                                                                                                                                    fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                                                        if(err){
                                                                                                                                                                                            throw err;
                                                                                                                                                                                        } else {
                                                                                                                                                                                            console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 9`)
                                                                                                                                                                                        }
                                                                                                                                                                                    })
                                                                                                                                                                                }
                                                                                                                                                                            })
                                                                                                                                                                        })
                                                                                                                                                                    })
                                                                                                                                                                })
                                                                                                                                                            } else {
                                                                                                                                                                client.ReactRoles = {
                                                                                                                                                                    "RR1": RR1,
                                                                                                                                                                    "RR2": RR2,
                                                                                                                                                                    "RR3": RR3,
                                                                                                                                                                    "RR4": RR4,
                                                                                                                                                                    "RR5": RR5,
                                                                                                                                                                    "RR6": RR6,
                                                                                                                                                                    "RR7": RR7,
                                                                                                                                                                    "RR8": RR8,
                                                                                                                                                                    "RR9": null,
                                                                                                                                                                    "RR10": null
                                                                                                                                                                }
                                                                                                                                                                fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                                    if(err){
                                                                                                                                                                        throw err;
                                                                                                                                                                    } else {
                                                                                                                                                                        console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 8`)
                                                                                                                                                                    }
                                                                                                                                                                })
                                                                                                                                                            }
                                                                                                                                                        })
                                                                                                                                                    })
                                                                                                                                                })
                                                                                                                                            })
                                                                                                                                        } else {
                                                                                                                                            client.ReactRoles = {
                                                                                                                                                "RR1": RR1,
                                                                                                                                                "RR2": RR2,
                                                                                                                                                "RR3": RR3,
                                                                                                                                                "RR4": RR4,
                                                                                                                                                "RR5": RR5,
                                                                                                                                                "RR6": RR6,
                                                                                                                                                "RR7": RR7,
                                                                                                                                                "RR8": null,
                                                                                                                                                "RR9": null,
                                                                                                                                                "RR10": null
                                                                                                                                            }
                                                                                                                                            fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                                                if(err){
                                                                                                                                                    throw err;
                                                                                                                                                } else {
                                                                                                                                                    console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 7`)
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                })
                                                                                                                            })
                                                                                                                        })
                                                                                                                    } else {
                                                                                                                        client.ReactRoles = {
                                                                                                                            "RR1": RR1,
                                                                                                                            "RR2": RR2,
                                                                                                                            "RR3": RR3,
                                                                                                                            "RR4": RR4,
                                                                                                                            "RR5": RR5,
                                                                                                                            "RR6": RR6,
                                                                                                                            "RR7": null,
                                                                                                                            "RR8": null,
                                                                                                                            "RR9": null,
                                                                                                                            "RR10": null
                                                                                                                        }
                                                                                                                        fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                                            if(err){
                                                                                                                                throw err;
                                                                                                                            } else {
                                                                                                                                console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 6`)
                                                                                                                            }
                                                                                                                        })
                                                                                                                    }
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                } else {
                                                                                                    client.ReactRoles = {
                                                                                                        "RR1": RR1,
                                                                                                        "RR2": RR2,
                                                                                                        "RR3": RR3,
                                                                                                        "RR4": RR4,
                                                                                                        "RR5": RR5,
                                                                                                        "RR6": null,
                                                                                                        "RR7": null,
                                                                                                        "RR8": null,
                                                                                                        "RR9": null,
                                                                                                        "RR10": null
                                                                                                    }
                                                                                                    fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                                        if(err){
                                                                                                            throw err;
                                                                                                        } else {
                                                                                                            console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 5`)
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            } else {
                                                                                client.ReactRoles = {
                                                                                    "RR1": RR1,
                                                                                    "RR2": RR2,
                                                                                    "RR3": RR3,
                                                                                    "RR4": RR4,
                                                                                    "RR5": null,
                                                                                    "RR6": null,
                                                                                    "RR7": null,
                                                                                    "RR8": null,
                                                                                    "RR9": null,
                                                                                    "RR10": null
                                                                                }
                                                                                fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                                    if(err){
                                                                                        throw err;
                                                                                    } else {
                                                                                        console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 4`)
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        } else {
                                                            client.ReactRoles = {
                                                                "RR1": RR1,
                                                                "RR2": RR2,
                                                                "RR3": RR3,
                                                                "RR4": null,
                                                                "RR5": null,
                                                                "RR6": null,
                                                                "RR7": null,
                                                                "RR8": null,
                                                                "RR9": null,
                                                                "RR10": null
                                                            }
                                                            fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                                                if(err){
                                                                    throw err;
                                                                } else {
                                                                    console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 3`)
                                                                }
                                                            })
                                                        }
                                                    })
                                                })
                                            })
                                        })
                                    } else {
                                        client.ReactRoles = {
                                            "RR1": RR1,
                                            "RR2": RR2,
                                            "RR3": null,
                                            "RR4": null,
                                            "RR5": null,
                                            "RR6": null,
                                            "RR7": null,
                                            "RR8": null,
                                            "RR9": null,
                                            "RR10": null
                                        }
                                        fs.writeFile('./ReactRolesR.json', JSON.stringify (client.ReactRoles, null, 4), err => {
                                            if(err){
                                                throw err;
                                            } else {
                                                console.log(`Reaction roles roles were assigned by ${message.author.username}. Amount: 2`)
                                            }
                                        })
                                    }
                                })
                            })
                        })
                    })
                })
                .catch(error => {
                    message.channel.send('You did not enter the required information, role assgnment cancelled.');
                    console.log(error);
                })
            })
        } else {
            return console.log(`${message.author.username} tried to assign reaction roles without having sufficient permissions.`);
        }
    }
}