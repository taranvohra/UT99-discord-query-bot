import cloneDeep from 'lodash/cloneDeep';
import stringHash from 'string-hash';
import API from './api';
import {
  filterFalsyValues,
  createObjectFromArray,
  checkKeyExistenceFromIndex,
  getHostAndPortOfServerFromDB,
} from './helpers';

export const addQueryServer = async ([_, hp, ...args], cachedDB) => {
  try {
    const [host, port] = hp.split(':');
    const { name, aliases } = args.reduce(
      (acc, curr) => {
        typeof curr === 'string'
          ? (acc.name += curr + ' ')
          : (acc.aliases = curr);
        return acc;
      },
      { name: '', aliases: [] }
    );

    if (!host || !port || !name)
      return { status: false, msg: 'Invalid command' };

    const clonedDB = typeof cachedDB !== 'object' ? {} : cloneDeep(cachedDB);
    const uid = stringHash(hp);

    if (clonedDB.hasOwnProperty(uid))
      return { status: false, msg: 'Already exists' };
    console.log('1');
    clonedDB[uid] = { host, port, name, aliases };

    const result = await API.updateDB(clonedDB);
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, msg: 'Something went wrong' };
  }
};

export const delQueryServer = () => {};

export const updateQueryServer = () => {};

export const queryUT99Server = async (args, cachedDB) => {
  const [host, port] = checkKeyExistenceFromIndex(cachedDB, parseInt(args))
    ? getHostAndPortOfServerFromDB(cachedDB, parseInt(args))
    : args.split(':');

  if (!host || !port) return { status: false, msg: 'Invalid' };

  try {
    const response = await API.getUT99ServerStatus(host, parseInt(port) + 1);
    const splittedResponse = response.split('\\');
    const filteredResult = filterFalsyValues(splittedResponse);
    const result = filteredResult.reduce(
      (acc, curr) => {
        if (curr === 'player_0') acc.pFlag = true;
        acc.pFlag ? acc.players.push(curr) : acc.info.push(curr);
        return acc;
      },
      {
        info: [],
        players: [],
        pFlag: false,
      }
    );
    return {
      status: true,
      info: { ...createObjectFromArray(result.info), host, port },
      players: createObjectFromArray(result.players),
    };
  } catch (error) {
    return { status: false, msg: `Could not query` };
  }
};
