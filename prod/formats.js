'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printServerStatus = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _helpers = require('./helpers');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printServerStatus = exports.printServerStatus = function printServerStatus(_ref) {
  var info = _ref.info,
      players = _ref.players;

  var richEmbed = new _discord2.default.RichEmbed();
  var desc = '**Map:** ' + info.mapname + ' \n **Players:** ' + info.numplayers + '/' + info.maxplayers + ' ';

  var playerList = (0, _helpers.getPlayersFromList)(players, parseInt(info.numplayers) || 0, !!info.maxteams);

  (0, _keys2.default)(playerList).forEach(function (team) {
    var p = playerList[team];
    var teamPlayers = p.reduce(function (acc, curr) {
      acc = acc + curr + '\n';
      return acc;
    }, '');
    p.length > 0 ? richEmbed.addField(team, teamPlayers, team !== _constants.teams.spec) : '';
  });

  richEmbed.setTitle(info.hostname);
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  return richEmbed;
};