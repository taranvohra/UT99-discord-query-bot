import Discord from 'discord.js';
import {
  getPlayerList,
  getMinutesAndSeconds,
  padNumberWithZero,
  getTeamScores,
  getTeamIndex,
} from './helpers';
import { teams } from './constants';

export const printServerStatus = ({ info, players }) => {
  const xServerQueryProps = {};
  let richEmbed = new Discord.RichEmbed();

  // If XServerQuery response, then some more coooooooooool stuff
  if (info['xserverquery']) {
    const { minutes, seconds } = getMinutesAndSeconds(
      parseInt(info['remainingtime'])
    );
    const teamScores = getTeamScores(info, info.maxteams);

    xServerQueryProps.teamScores = Object.keys(teamScores).reduce(
      (acc, curr) => {
        const index = getTeamIndex(curr);
        acc[index] = ` | Score - ${teamScores[curr]}`;
        return acc;
      },
      []
    );
    xServerQueryProps.remainingTime = `${
      minutes < info.timelimit ? '**Remaining Time:**' : '**Overtime**:'
    } ${padNumberWithZero(minutes)}:${padNumberWithZero(seconds)} \n`;
  }

  const playerList = getPlayerList(
    players,
    parseInt(info.numplayers) || 0,
    !!info.maxteams
  );

  Object.keys(playerList).forEach(team => {
    const teamIndex = getTeamIndex(team);
    const p = playerList[team];
    const teamPlayers = p.reduce((acc, curr) => {
      acc = acc + curr + ' ' + '\n';
      return acc;
    }, '');
    p.length > 0
      ? richEmbed.addField(
          team + (xServerQueryProps.teamScores[teamIndex] || ``),
          teamPlayers,
          team !== teams.spec
        )
      : '';
  });

  const desc =
    `**Map:** ${info.mapname} \n **Players:** ${info.numplayers}/${
      info.maxplayers
    } \n ` + (xServerQueryProps.remainingTime || ``);
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
