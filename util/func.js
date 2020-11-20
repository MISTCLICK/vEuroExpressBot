const Discord = require('discord.js');
const mongo = require('../mongo/mongo.js');
const supportScript = require('./supportSetupScript.js');
const welcomeScript = require('./welcomeScript.js');
const statScript = require('./statScript.js');

async function supportSetup(message, client) {
  message.reply("Please tag the channel that you'd like to be the **support** channel.").then(() => {
    const filter = m => message.author.id === m.author.id;

    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
    .then(async messages => {
      const supChannel = messages.first().content;
      const supChannelID = supChannel.slice(2, -1);
      const supChannelObj = client.channels.cache.get(supChannelID);
      message.channel.send("Please specify the link that the embed's title will lead to!").then(() => {
        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
        .then(async messages => {
          const link = messages.first().content;
          message.channel.send("Please specify the ID of the **support-chanels** category!").then(() => {
            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
            .then(messages => {
              const categoryID = messages.first().content;
              message.guild.channels.create('support-log', { type: 'text'}).then(async channel => {
                channel.setParent(categoryID);
                channel.overwritePermissions([
                  {
                    id: message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                  }
                ]);
                const logChannelID = channel.id;
                message.channel.send("A support-log channel has been created, if you wish, you can now manually setup permissions for it (not a bot function).\n\nPlease tag the `@Support` role of the server!").then(() => {
                  message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                  .then(async messages => {
                    const supportRoleID = messages.first().content.slice(3, -1);
                    
                    let schEmbed = await supChannelObj.send(new Discord.MessageEmbed()
                    .setColor('#00309d')
                    .setAuthor('Support Ticket system', client.user.displayAvatarURL(), link)
                    .setDescription('Press the reaction below to open a new ticket!')
                    );
                
                    schEmbed.react('🎫');
                
                    const guildID = message.guild.id;
                
                    await mongo().then(async mongoose => {
                      try {
                        await supportScript.findOneAndUpdate({
                          guildID,
                          setupType: 0
                        }, {
                          guildID,
                          setupType: 0,
                          channelID: supChannelID,
                          categoryID: categoryID,
                          supportRoleID: supportRoleID,
                          logChannelID: logChannelID
                      }, {
                          upsert: true,
                          useFindAndModify: false
                      });
                      } finally {
                        mongoose.connection.close();
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }).catch(() => {
    message.reply('You did not send the required information in time.');
  });
};

async function welcomeSetup(message, guildID) {
  message.reply("Please tag the channel that you'd like the welcome messages to appear in!").then(() => {
    const filter = m => message.author.id === m.author.id;

    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
    .then(messages => {
      const welcomeChannelID = messages.first().content.slice(2, -1);
      message.channel.send('Please provide the welcome message for your server! If you wish not to have a welcome message, plase enter "N"').then(() => {
        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
        .then(messages => {
          let welcomeMessage = messages.first().content;
          if (welcomeMessage == 'N') welcomeMessage = null;
          message.channel.send("Please tag the channel that you'd like the leave messages to appear in!").then(() => {
            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
            .then(messages => {
              const leaveChannelID = messages.first().content.slice(2, -1);
              message.channel.send('Please provide the leave message for your server! If you wish not to have a leave message, please enter "N"').then(() => {
                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                .then(messages => {
                  let leaveMessage = messages.first().content;
                  if (leaveMessage == 'N') leaveMessage = null;
                  message.channel.send(`Please tag the role that you'd like to be the default role for joining members! If you wish not to have a default role, please enter "N"`).then(() => {
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: [ 'time' ] })
                    .then(async messages => {
                      let entryRole = messages.first().content;
                      if (entryRole == 'N') entryRole = null;
                      await mongo().then(async mongoose => {
                        try {
                          await welcomeScript.findOneAndUpdate({
                            guildID,
                          }, {
                            guildID,
                            setupType: 2,
                            welcomeChannelID,
                            welcomeMessage,
                            leaveChannelID,
                            leaveMessage,
                            entryRole
                          }, {
                            upsert: true,
                            useFindAndModify: false
                          });
                        } finally {
                          mongoose.connection.close();
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }).catch(() => {
    message.reply('You did not send the required information in time.');
  });
}

async function statsSetup(message, type = Number) {
  //Type values: 0 = total memberocunt;
  let name = '';
  if (type == 0) {
    name += `Members: ${message.guild.memberCount.toLocaleString()}`;
  }
  message.guild.channels.create(name, { type: 'voice' }).then(async channel => {
    channel.setPosition(0);
    channel.overwritePermissions([
      {
        id: message.guild.roles.everyone,
        allow: ["VIEW_CHANNEL"],
        deny: ["CONNECT"]
      }
    ]);
    const channelID = channel.id;
    const guildID = message.guild;
    await mongo().then(async mongoose => {
      try {
        await statScript.findOneAndUpdate({
          guildID
        }, {
          guildID,
          setupType: 3,
          channelID
        }, {
          upsert: true,
          useFindAndModify: false
        });
      } finally {
        mongoose.connection.close();
      }
    });
  });
}

module.exports = { supportSetup, welcomeSetup, statsSetup };