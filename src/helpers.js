import { teams, privilegedRoles } from './constants';

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
    if (index % 2 === 0) acc[item.toLowerCase()] = arr[index + 1];
    return acc;
  }, {});
};

/**
 * @param {Object} cachedDB
 * @param {Number} index
 * @description Checks if Key exists
 */
export const checkKeyExistenceFromIndex = (cachedDB, index) =>
  !!cachedDB[index - 1];

/**
 * @param {Object} cachedDB
 * @param {Number} index
 * @description Obtains Host and Port of a server from cache
 */
export const getHostAndPortOfServerFromDB = (cachedDB, index) => [
  cachedDB[index - 1].host,
  cachedDB[index - 1].port,
];

/**
 * @param {Object} cachedDB
 * @param {Number} index
 * @description Obtains UID of a server from cache
 */
export const getUIDFromIndex = (cachedDB, index) =>
  (cachedDB.length > 0 && cachedDB[index - 1].id) || undefined;

/**
 * @param {Object} snapshot
 * @description returns a cache of sorted servers
 */
export const createSortedDBSnapshot = snapshot => {
  let sortedSnapshot = [];
  snapshot.forEach(child => {
    sortedSnapshot.push({ id: child.key, ...child.val() });
  });
  return sortedSnapshot;
};

export const checkIfRoleIsPrivileged = roles =>
  privilegedRoles.some(r => roles.find(x => x.name === r));

/**
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
    const cFlag =
      !!players[`countryc_${i}`] && players[`countryc_${i}`]
        ? `:flag_${players[`countryc_${i}`]}:`
        : `:flag_white:`;

    const playerName =
      cFlag + ' ' + fixSpecialCharactersInName(players[`player_${i}`]);
    if (players[`mesh_${i}`] === 'Spectator') {
      playerList[teams.spec].push(playerName);
      continue;
    }

    if (noOfTeams > 0) {
      const team = parseInt(players[`team_${i}`]);
      playerList[Object.values(teams)[team]].push(playerName);
    } else playerList[teams.team_255].push(playerName);
  }
  return playerList;
};

export const getTeamScores = (info, maxTeams) => {
  let teamScores = {
    [teams.team_0]: [],
    [teams.team_1]: [],
    [teams.team_2]: [],
    [teams.team_3]: [],
  };

  for (let i = 0; i < maxTeams; i++) {
    teamScores[Object.values(teams)[i]] = info[`teamscore_${i}`];
  }
  return teamScores;
};

const fixSpecialCharactersInName = name =>
  name.replace(/(\*|`|:)/g, c => '\\' + c);

export const padNumberWithZero = number =>
  number > -1 && number < 10 ? `0${number}` : `${number}`;

export const getMinutesAndSeconds = time => {
  const seconds = time % 60;
  const minutes = (time - seconds) / 60;
  return {
    seconds,
    minutes,
  };
};

export const getTeamIndex = teamName =>
  Object.values(teams).findIndex(t => t === teamName);
