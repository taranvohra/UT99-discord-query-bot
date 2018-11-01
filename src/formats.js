import Discord from 'discord.js';

export const printServerStatus = ({ info, players }) => {
  let richEmbed = new Discord.RichEmbed();
  let desc = `**Map:** ${info.mapname} \n **Players:** ${info.numplayers}/${
    info.maxplayers
  } `;
  richEmbed.setTitle(info.hostname);
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  return richEmbed;
};
