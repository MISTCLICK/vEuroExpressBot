import { MessageCollector } from 'discord.js';
import Commando from 'discord.js-commando';
import welcomeScript, { settings } from '../../schema/welcomeScript';

export default class SetupCommand extends Commando.Command {
  constructor(client: Commando.CommandoClient) {
    super(client, {
      name: 'setup-welcome',
      group: 'admin',
      memberName: 'setup-welcome',
      description: 'Setup process for the server entry/exits.',
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_MESSAGES'],
      guildOnly: true
    });
  }

  async run(message: Commando.CommandoMessage) {
    const questions = [
      'Tag the channel where you would like for the new server members to be announced in.',
      'Enter the welcome message.',
      'Tag the default role or type `N` if you would like not to have a default role.',
      'Tag the channel where you would like for the leavning members to be announced in.',
      'Enter the farewell message.'
    ];
    let counter = 0;
    const guildID = message.guild.id;
    const filter = (m: Commando.CommandoMessage) => m.author.id === message.author.id;
    //@ts-ignore
    const collector = new MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 1000 * 120
    });
    
    message.channel.send(questions[counter++]);
    collector.on('collect', async m => {
      if (counter < questions.length) {
        m.channel.send(questions[counter++]);
      }
    });
    
    collector.on('end', async collected => {
      const collectedArr = collected.array();
      if (collectedArr.length < questions.length) return message.reply('Not enough information provided.');
    
      let welcomeRoleID;
      if (collectedArr[2].content === 'N') {
        //@ts-ignore
        welcomeRoleID = undefined; 
      } else {
        welcomeRoleID = collectedArr[2].content.slice(3, -1);
      }
    
      const settingsObj: settings = {
        welcome: {
          channelID: collectedArr[0].content.slice(2, -1),
          text: collectedArr[1].content,
          role: welcomeRoleID
        },
        leave: {
          channelID: collectedArr[3].content.slice(2, -1),
          text: collectedArr[4].content
        }
      }
    
      await welcomeScript.findOneAndUpdate({
        guildID
      }, {
        guildID,
        settingsObj
      }, {
        upsert: true,
        useFindAndModify: false
      }).catch(err => console.error(err));
      return message.reply('The setup was successful.');
    });
    return null;
  }
}


