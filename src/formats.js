import Discord from 'discord.js';
import { getPlayerList } from './helpers';
import { teams } from './constants';

export const printServerStatus = ({ info, players }) => {
  let richEmbed = new Discord.RichEmbed();
  const desc = `**Map:** ${info.mapname} \n **Players:** ${info.numplayers}/${
    info.maxplayers
  } `;

  const playerList = getPlayerList(
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

  const footerText = `unreal://${info.host}:${info.port}`;

  richEmbed.setTitle(info.hostname);
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  richEmbed.setFooter(footerText);
  return richEmbed;
};

export const printServerList = cachedDB => {
  let richEmbed = new Discord.RichEmbed();

  const { desc } = cachedDB.reduce(
    (acc, curr, index) => {
      acc.desc += `\`${index + 1}\`\u00A0\u00A0\u00A0${curr.name}\n`;
      return acc;
    },
    {
      desc: '',
    }
  );

  richEmbed.setTitle(`IP\u00A0\u00A0\u00A0Name`);
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  richEmbed.setFooter('To query, type .q ip');
  return richEmbed;
};
