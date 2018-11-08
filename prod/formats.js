'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printServerList = exports.printServerStatus = undefined;

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

  var playerList = (0, _helpers.getPlayerList)(players, parseInt(info.numplayers) || 0, !!info.maxteams);

  (0, _keys2.default)(playerList).forEach(function (team) {
    var p = playerList[team];
    var teamPlayers = p.reduce(function (acc, curr) {
      acc = acc + curr + ' ' + '\n';
      return acc;
    }, '');
    p.length > 0 ? richEmbed.addField(team, teamPlayers, team !== _constants.teams.spec) : '';
  });

  var footerText = 'unreal://' + info.host + ':' + info.port;

  richEmbed.setTitle(info.hostname);
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  richEmbed.setFooter(footerText);
  return richEmbed;
};

var printServerList = exports.printServerList = function printServerList(cachedDB) {
  var richEmbed = new _discord2.default.RichEmbed();

  var _cachedDB$reduce = cachedDB.reduce(function (acc, curr, index) {
    acc.desc += '`' + (index + 1) + '`\xA0\xA0\xA0' + curr.name + '\n';
    return acc;
  }, {
    desc: ''
  }),
      desc = _cachedDB$reduce.desc;

  richEmbed.setTitle('IP\xA0\xA0\xA0Name');
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  richEmbed.setFooter('To query, type .q ip');
  return richEmbed;
};