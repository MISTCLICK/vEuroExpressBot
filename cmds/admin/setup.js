const Commando = require('discord.js-commando');
const func = require('../../util/func.js');

module.exports = class SetupCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setup',
            group: 'admin',
            memberName: 'setup',
            description: 'The command required to set the bot up for your own server.',
            guildOnly: true,
            userPermissions: ['MANAGE_GUILD'],
            clientPermissions: ['ADMINISTRATOR'],
            guarded: true,
            args: [
                {
                    key: 'setup_type',
                    label: 'setup type',
                    prompt: 'What part of this bot would you like to set up?',
                    type: 'string',
                    oneOf: ['support', /*'rr',*/ 'welcome', 'stats', 'ALL']
                },
                {
                    key: 'stat_type',
                    label: 'stat type',
                    prompt: 'What type of stats would you like to display?',
                    type: 'string',
                    oneOf: ['total'],
                    default: ''
                }
            ]
        });
    }

    async run(message, args) {
        if (args.setup_type == 'ALL') {}
        else if (args.setup_type == 'support') {
            func.supportSetup(message, this.client);
        }
/*         else if (args.setup_type == 'rr') {
            if (args.rrmodify == 'channel') {
                func.rrChannelSet(message);
            }
        } */
        else if (args.setup_type == 'welcome') {
            func.welcomeSetup(message, message.guild.id);
        }
        else if (args.setup_type == 'stats') {
            if (args.stat_type == 'total') {
                func.statsSetup(message, 0);
            }
        }
        else {}
    }
}