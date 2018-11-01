import { Client } from 'discord.js';
import { prefix, commands } from './constants';
import { queryUT99Server } from './ut99query';
import { printServerStatus } from './formats';

const disabledEvents = ['TYPING_START', 'CHANNEL_UPDATE', 'USER_UPDATE'];
const bot = new Client({ disabledEvents });

bot.on('ready', () => {
  console.log('ready');
});

bot.on('message', async message => {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.substring(prefix.length).split(' ');

  switch (args[0]) {
    case commands.addqueryserver:
      console.log(args[0]);
      break;

    case commands.delqueryserver:
      console.log(args[0]);
      break;

    case commands.updatequeryserver:
      console.log(args[0]);
      break;

    case commands.queryut99server: {
      const result = await queryUT99Server(args[1]);
      message.channel
        .send(printServerStatus(result))
        .then(message => console.log('Help sent'))
        .catch(console.error + ':help:');
      break;
    }

    default:
      console.log('nothing');
  }
});

bot.login('MzkzMzM1NDU3MDA3NjY1MTUy.DrsR6g.yb9uY50QHZ7s51f5dzI_G9snPvw');
