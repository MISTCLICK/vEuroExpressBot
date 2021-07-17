import { MessageCollector, MessageEmbed } from 'discord.js';
import rrScript from '../../schema/reactionRoleScript';
import Commando from 'discord.js-commando';

export default class SetupCommand extends Commando.Command {
  constructor(client: Commando.CommandoClient) {
    super(client, {
      name: 'setup-reactions',
      group: 'admin',
      memberName: 'setup-reactions',
      description: 'Setup process for the server reaction roles.',
      clientPermissions: ['ADMINISTRATOR'],
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_MESSAGES'],
      guildOnly: true,
      argsType: 'single'
    });
  }

  async run(message: Commando.CommandoMessage, args: string) {
    let counter = 0;
    let collector: MessageCollector;
    let questions: string[] = [];
    const filter = (m: Commando.CommandoMessage) => m.author.id === message.author.id;

    if (args === 'channel') {
      questions = [
        'Tag the channel you would like to use for reaction-roles.'
      ];

      collector = new MessageCollector(message.channel, filter, {
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

        const channel: any = this.client.channels.cache.get(collectedArr[0].content.slice(2, -1));
        if (channel) {
          const EmojiEmbed = new MessageEmbed()
          .setColor('#00309d')
          .setAuthor('Reaction roles: Menu', this.client.user?.displayAvatarURL())
          .setDescription('```\nReact to this message to get roles correspondant to the emoji\n```\n')
          .setFooter('Found a bug? Report it in #support!', this.client.user?.displayAvatarURL())

          channel.send(EmojiEmbed);
        } else {
          return message.reply('Channel not found!');
        }

        await rrScript.findOneAndUpdate({
          guildID: message.guild.id
        }, {
          guildID: message.guild.id,
          channelID: collectedArr[0].content.slice(2, -1)
        }, {
          upsert: true
        });

        return message.reply('Channel selected successfully.');
      });
    } else if (args === 'add') {
      const guildCheckAdd = await rrScript.findOne({
        guildID: message.guild.id
      });

      if (!guildCheckAdd) {
        return message.reply('Please select the channel first using `!setup-reactions channel`');
      }
      questions = [
        'Tag the role.',
        'Enter the emoji **(must be a default emoji or from this server)**.'
      ];

      collector = new MessageCollector(message.channel, filter, {
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

        const role_id = collectedArr[0].content.slice(3, -1);
        const emoji = collectedArr[1].content;

        await rrScript.findOneAndUpdate({
          guildID: message.guild.id
        }, {
          guildID: message.guild.id,
          $push: {
            reactions: {
              role_id,
              emoji
            }
          }
        }, {
          upsert: false
        });

        this.client.emit('updateReactionRoles', message.guild.id);

        return message.reply('Reaction role added successfully.');
      });
    } else if (args === 'remove') {
      const guildCheckRemove = await rrScript.findOne({
        guildID: message.guild.id
      });

      if (!guildCheckRemove) {
        return message.reply('Please select the channel first using `!setup-reactions channel`');
      }

      questions = [
        'Tag the role to be removed.'
      ];

      collector = new MessageCollector(message.channel, filter, {
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

        const role_id = collectedArr[0].content.slice(3, -1);

        await rrScript.findOneAndUpdate({
          guildID: message.guild.id
        }, {
          guildID: message.guild.id,
          reactions: guildCheckRemove.reactions.filter(r => r.role_id !== role_id)
        }, {
          upsert: false
        });

        this.client.emit('updateReactionRoles', message.guild.id);

        return message.reply('Reaction role removed successfully.');
      });
    } else if (args === 'reset') {
      const guildCheckReset = await rrScript.findOne({
        guildID: message.guild.id
      });

      if (!guildCheckReset) {
        return message.reply('Your server doesn\'t have reaction roles set up. Nothing to reset.');
      } else {
        const channel = this.client.channels.cache.get(guildCheckReset.channelID);
        if (channel) {
          //@ts-ignore
          channel.messages.fetch().then(msgs => {
            if (msgs.size > 0) {
              for (const msg of msgs) {
                msg[1].delete();
              }
            }
          });
        }

        await rrScript.findOneAndRemove({
          guildID: message.guild.id
        });

        return message.reply('Reset successful.');
      }
    } else {
      return message.reply('No setup type determined.');
    }
    return null;
  }
}


