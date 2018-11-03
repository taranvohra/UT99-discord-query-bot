import { teams } from './constants';

/**
 * @param {String} packet
 * @description Checks whether the packet is the last packet
 * @returns {Boolean}
 */
export const checkIfFinalPacket = packet =>
  packet
    .toString()
    .split('\\')
    .some(s => s === 'final');

/**
 * @param  {Array} array
 * @description Filters out falsy values from array
 * @returns {Array}
 */
export const filterFalsyValues = array => array.filter(v => Boolean(v));

/**
 * @param  {Array} array
 * @description Creates an object from an array by taking adjacent odd and even indexes
 * @returns {Object}
 */
export const createObjectFromArray = array => {
  return array.reduce((acc, item, index, arr) => {
    if (index % 2 === 0) acc[item] = arr[index + 1];
    return acc;
  }, {});
};

export const checkKeyExistenceFromIndex = (cachedDB, index) =>
  !!cachedDB[index - 1];

export const getHostAndPortOfServerFromDB = (cachedDB, index) => [
  cachedDB[index - 1].host,
  cachedDB[index - 1].port,
];

export const getUIDFromIndex = (cachedDB, index) =>
  (cachedDB.length > 0 && cachedDB[index - 1].id) || undefined;

export const createSortedDBSnapshot = snapshot => {
  let sortedSnapshot = [];
  snapshot.forEach(child => {
    sortedSnapshot.push({ id: child.key, ...child.val() });
  });
  return sortedSnapshot;
};

/**
 *
 * @param {Object} players
 * @param {Number} noOfPlayers
 * @param {Number} noOfTeams
 */
export const getPlayerList = (players, noOfPlayers, noOfTeams) => {
  let playerList = {
    [teams.team_0]: [],
    [teams.team_1]: [],
    [teams.team_2]: [],
    [teams.team_3]: [],
    [teams.team_255]: [],
    [teams.spec]: [],
  };

  for (let i = 0; i < noOfPlayers; i++) {
    const playerName = players[`player_${i}`];
    if (players[`mesh_${i}`] === 'Spectator') {
      playerList[teams.spec].push(playerName);
      i++;
      continue;
    }

    if (noOfTeams > 0) {
      const team = parseInt(players[`team_${i}`]);
      playerList[Object.values(teams)[team]].push(playerName);
    } else playerList[teams.team_255].push(playerName);
  }

  return playerList;
};
