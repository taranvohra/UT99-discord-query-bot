'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlayersFromList = exports.createObjectFromArray = exports.filterFalsyValues = exports.checkIfFinalPacket = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} packet
 * @description Checks whether the packet is the last packet
 * @returns {Boolean}
 */
var checkIfFinalPacket = exports.checkIfFinalPacket = function checkIfFinalPacket(packet) {
  return packet.toString().split('\\').some(function (s) {
    return s === 'final';
  });
};

/**
 * @param  {Array} array
 * @description Filters out falsy values from array
 * @returns {Array}
 */
var filterFalsyValues = exports.filterFalsyValues = function filterFalsyValues(array) {
  return array.filter(function (v) {
    return Boolean(v);
  });
};

/**
 * @param  {Array} array
 * @description Creates an object from an array by taking adjacent odd and even indexes
 * @returns {Object}
 */
var createObjectFromArray = exports.createObjectFromArray = function createObjectFromArray(array) {
  return array.reduce(function (acc, item, index, arr) {
    if (index % 2 === 0) acc[item] = arr[index + 1];
    return acc;
  }, {});
};

var getPlayersFromList = exports.getPlayersFromList = function getPlayersFromList(players, noOfPlayers, noOfTeams) {
  var _playerList;

  var playerList = (_playerList = {}, (0, _defineProperty3.default)(_playerList, _constants.teams.team_0, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_1, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_2, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_3, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_255, []), (0, _defineProperty3.default)(_playerList, _constants.teams.spec, []), _playerList);

  for (var i = 0; i < noOfPlayers; i++) {
    var playerName = players['player_' + i];
    if (players['mesh_' + i] === 'Spectator') {
      playerList[_constants.teams.spec].push(playerName);
      i++;
      continue;
    }

    if (noOfTeams > 0) {
      var team = parseInt(players['team_' + i]);
      playerList[(0, _values2.default)(_constants.teams)[team]].push(playerName);
    } else playerList[_constants.teams.team_255].push(playerName);
  }

  return playerList;
};