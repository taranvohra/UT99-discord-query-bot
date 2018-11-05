'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlayerList = exports.checkIfRoleIsPrivileged = exports.createSortedDBSnapshot = exports.getUIDFromIndex = exports.getHostAndPortOfServerFromDB = exports.checkKeyExistenceFromIndex = exports.createObjectFromArray = exports.filterFalsyValues = exports.checkIfFinalPacket = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

/**
 * @param {Object} cachedDB
 * @param {Number} index
 * @description Checks if Key exists
 */
var checkKeyExistenceFromIndex = exports.checkKeyExistenceFromIndex = function checkKeyExistenceFromIndex(cachedDB, index) {
  return !!cachedDB[index - 1];
};

/**
 * @param {Object} cachedDB
 * @param {Number} index
 * @description Obtains Host and Port of a server from cache
 */
var getHostAndPortOfServerFromDB = exports.getHostAndPortOfServerFromDB = function getHostAndPortOfServerFromDB(cachedDB, index) {
  return [cachedDB[index - 1].host, cachedDB[index - 1].port];
};

/**
 * @param {Object} cachedDB
 * @param {Number} index
 * @description Obtains UID of a server from cache
 */
var getUIDFromIndex = exports.getUIDFromIndex = function getUIDFromIndex(cachedDB, index) {
  return cachedDB.length > 0 && cachedDB[index - 1].id || undefined;
};

/**
 * @param {Object} snapshot
 * @description returns a cache of sorted servers
 */
var createSortedDBSnapshot = exports.createSortedDBSnapshot = function createSortedDBSnapshot(snapshot) {
  var sortedSnapshot = [];
  snapshot.forEach(function (child) {
    sortedSnapshot.push((0, _extends3.default)({ id: child.key }, child.val()));
  });
  return sortedSnapshot;
};

var checkIfRoleIsPrivileged = exports.checkIfRoleIsPrivileged = function checkIfRoleIsPrivileged(roles) {
  return _constants.privilegedRoles.some(function (r) {
    return roles.find(function (x) {
      return x.name === r;
    });
  });
};

/**
 * @param {Object} players
 * @param {Number} noOfPlayers
 * @param {Number} noOfTeams
 */
var getPlayerList = exports.getPlayerList = function getPlayerList(players, noOfPlayers, noOfTeams) {
  var _playerList;

  var playerList = (_playerList = {}, (0, _defineProperty3.default)(_playerList, _constants.teams.team_0, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_1, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_2, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_3, []), (0, _defineProperty3.default)(_playerList, _constants.teams.team_255, []), (0, _defineProperty3.default)(_playerList, _constants.teams.spec, []), _playerList);

  for (var i = 0; i < noOfPlayers; i++) {
    var playerName = players['player_' + i];
    if (players['mesh_' + i] === 'Spectator') {
      playerList[_constants.teams.spec].push(playerName);
      continue;
    }

    if (noOfTeams > 0) {
      var team = parseInt(players['team_' + i]);
      playerList[(0, _values2.default)(_constants.teams)[team]].push(playerName);
    } else playerList[_constants.teams.team_255].push(playerName);
  }

  return playerList;
};