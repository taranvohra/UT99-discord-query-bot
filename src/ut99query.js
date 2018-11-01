import API from './api';
import { filterFalsyValues, createObjectFromArray } from './helpers';

export const addQueryServer = () => {};

export const delQueryServer = () => {};

export const updateQueryServer = () => {};

export const queryUT99Server = async args => {
  const [host, port] = args.split(':');
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
    info: { ...createObjectFromArray(result.info), host, port },
    players: result.players,
  };
};
