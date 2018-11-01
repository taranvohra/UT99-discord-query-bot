import Discord from 'discord.js';
import { getPlayersFromList } from './helpers';
import { teams } from './constants';

export const printServerStatus = ({ info, players }) => {
  let richEmbed = new Discord.RichEmbed();
  let desc = `**Map:** ${info.mapname} \n **Players:** ${info.numplayers}/${
    info.maxplayers
  } `;

  const playerList = getPlayersFromList(
    players,
    parseInt(info.numplayers) || 0,
    !!info.maxteams
  );

  Object.keys(playerList).forEach(team => {
    const p = playerList[team];
    const teamPlayers = p.reduce((acc, curr) => {
      acc = acc + curr + '\n';
      return acc;
    }, '');
    p.length > 0
      ? richEmbed.addField(team, teamPlayers, team !== teams.spec)
      : '';
  });

  richEmbed.setTitle(info.hostname);
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  return richEmbed;
};
