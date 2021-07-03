"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const discord_js_commando_1 = require("discord.js-commando");
class MetarCommand extends discord_js_commando_1.Command {
    constructor(client) {
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
    async run(message, { airport }) {
        try {
            if (airport.length !== 4)
                return message.reply('Please provide a 4 letter long ICAO code.');
            let metar = await axios_1.default.get(`http://metartaf.ru/${airport.toUpperCase()}.json`);
            if (metar.data.metar.slice(20).startsWith(airport.toUpperCase())) {
                let newMetar = metar.data.metar.slice(19);
                return message.reply('```' + newMetar + '```');
            }
            return message.reply('```' + metar.data.metar + '```');
        }
        catch (err) {
            return message.reply('Such airport was not found!');
        }
    }
}
exports.default = MetarCommand;
