import Commando from 'discord.js-commando';
import mongoose from 'mongoose';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import setupServer from './api/app';
import logger from './util/logger';
import autoUnmute from './util/auto-unmute';
import memberJL from './util/memberJL';
import supportHandler from './util/support';
import handleReactionRoles from './util/reactionRoles';
import updateStats from './util/updateStats';
import { mongoURI } from './config.json';

const client = new Commando.CommandoClient({
  owner: ['349553169035952140'],
  commandPrefix: '!'
});

export function setupClient() {
  client.once('ready', async () => {
    if (!mongoURI) throw new Error('vEX Bot error > No MongoDB URI provided');

    try {
      mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useFindAndModify: false
      });
      logger.info('MongoDB connection successfully established.');
    } catch (err) {
      logger.error('ERROR: MongoDB connection failed.', err);
    }

    logger.info('Setting up server.');
    setupServer();
    autoUnmute(client);
    memberJL(client);
    supportHandler(client);
    handleReactionRoles(client);

    client.emit('updateReactionRoles');
    setInterval(() => client.emit('updateReactionRoles'), 1000 * 60 * 5);
    setInterval(() => updateStats(client), 1000 * 60 * 5);

    client.user?.setActivity('v2.0 | !help');
    logger.info(`${client.user?.username} is ready to perform their duties.`);
  });

  client.registry
    .registerDefaultTypes()
    .registerGroups([
      ['aviation', 'Aviation commands.'],
      ['admin', 'Admin commands.'],
      ['misc', 'Miscellaneous commands.']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
      unknownCommand: false,
      prefix: false
    })
    .registerCommandsIn(path.join(__dirname, 'cmds'));

  client.on('unknownCommand', m => console.log(`${m.author.username} tried to use an unknown command: "${m.content}"`));

  client.on('message', async (message) => {
    //@ts-ignore
    if (message.channel.name.startsWith("ticket-")) {
      const handleTime = (timestamp: number) => {
        let time = moment(timestamp).utc();
        let m3time = time.format("DD/MM/YYYY - HH:mm:ss");
        return m3time;
      }

      let msgTicketText = `${message.author.username} at ${handleTime(message.createdTimestamp)} => [ ${message.content} ]`;
      //@ts-ignore 
      fs.appendFileSync(path.join(__dirname, `log/support/${message.channel.name}.txt`), `${msgTicketText}\n`, async err => {
          if (err) throw err;
      });
    }
});
}

export default client;