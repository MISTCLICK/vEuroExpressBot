const client = require('/vEuroExpressBot/main.js')

const fs = require('fs');

module.exports = {
    name: 'cancel',
    description: "Command for cancelling the creation process of an announcement.",
    execute(message, args){
        if(message.member.roles.cache.has('748827786923475034')){
            client.AnnouncementEmbedInfo = {
                "title": null,
                "titleURL": null,
                "descriptionAnn": null,
                "Footer": null,
                "ImageURL": null
            } 
            fs.writeFile('./AnnouncementEmbedInfo.json', JSON.stringify (client.AnnouncementEmbedInfo, null, 4), err => {
                if(err){
                    throw err;
                } else {
                    console.log(`${message.author.username} has cancelled the creation of an announcement. JSON successfully cleared!`);
                }
            });
        }
    }
}