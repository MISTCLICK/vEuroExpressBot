import axios from 'axios';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

interface thisArgs {
  airport: string;
}

export default class MetarCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'metar',
      description: 'Gives out airport\'s METAR.',
      memberName: 'metar',
      group: 'aviation',
      aliases: ['m'],
      args: [{
        key: 'airport',
        type: 'string',
        default: '',
        prompt: 'Please provide a 4 letter long ICAO code.'
      }]
    });
  }

  async run(message: CommandoMessage, { airport }: thisArgs) {
    try {
      if (airport.length !== 4) return message.reply('Please provide a 4 letter long ICAO code.');
      let metar = await axios.get(`http://metartaf.ru/${airport.toUpperCase()}.json`);
      if (metar.data.metar.slice(20).startsWith(airport.toUpperCase())) {
        let newMetar = metar.data.metar.slice(19);
        return message.reply('```' + newMetar + '```')
      }
      return message.reply('```' + metar.data.metar + '```');
    } catch (err) {
      return message.reply('Such airport was not found!')
    }
  }
}