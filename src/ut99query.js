import stringHash from 'string-hash';
import API from './api';
import {
  createObjectFromArray,
  checkKeyExistenceFromIndex,
  getHostAndPortOfServerFromDB,
  getUIDFromIndex,
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

    const uid = stringHash(hp);

    if (cachedDB.some(s => parseInt(s.id) === parseInt(uid)))
      return { status: false, msg: 'Already exists' };

    const newServer = { host, port, name, aliases, timestamp: Date.now() };

    const result = await API.pushToDB(uid, newServer);
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, msg: 'Something went wrong' };
  }
};

export const delQueryServer = async ([_, index, ...args], cachedDB) => {
  try {
    const uid = getUIDFromIndex(cachedDB, parseInt(index));
    if (!uid) return { status: false, msg: `Query server doesn't exist` };

    const result = await API.deleteFromDB(uid);
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, msg: 'Something went wrong' };
  }
};

export const updateQueryServer = () => {};

export const queryUT99Server = async (args, cachedDB) => {
  const [host, port] = checkKeyExistenceFromIndex(cachedDB, parseInt(args))
    ? getHostAndPortOfServerFromDB(cachedDB, parseInt(args))
    : args.split(':');

  if (!host || !port) return { status: false, msg: 'Invalid' };

  try {
    const response = await API.getUT99ServerStatus(host, parseInt(port) + 1);
    const splittedResponse = response.split('\\');
    const filteredResult = [...splittedResponse];
    filteredResult.shift();
    filteredResult.unshift();
    const result = filteredResult.reduce(
      (acc, curr) => {
        if (curr === 'player_0' || curr === 'Player_0') acc.pFlag = true;
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
    console.log(error);
    return { status: false, msg: `Could not query` };
  }
};
