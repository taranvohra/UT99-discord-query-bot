import { Client } from 'discord.js';
import { prefix, commands } from './constants';
import { addQueryServer, queryUT99Server } from './ut99query';
import { printServerStatus, printServerList } from './formats';
import API from './api';

let cachedDB = {};
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
    case commands.servers: {
      message.channel
        .send(printServerList(cachedDB))
        .catch(console.error + ':list:');
      break;
    }

    case commands.addqueryserver: {
      const result = await addQueryServer(args, cachedDB);
      result.status ? updateCache(result.cache) : '';
      message.channel.send(result.msg);
      break;
    }

    case commands.delqueryserver:
      console.log(args[0]);
      break;

    case commands.updatequeryserver:
      console.log(args[0]);
      break;

    case commands.queryut99server: {
      const result = await queryUT99Server(args[1], cachedDB);
      message.channel
        .send(result.status ? printServerStatus(result) : result.msg)
        .catch(console.error + ':query:');
      break;
    }

    default:
      console.log('no match');
  }
});

(async () => {
  cachedDB = await API.getCopyOfDB();
  bot.login('MzkzMzM1NDU3MDA3NjY1MTUy.DrsR6g.yb9uY50QHZ7s51f5dzI_G9snPvw');
})();

const updateCache = newCache => (cachedDB = newCache);
