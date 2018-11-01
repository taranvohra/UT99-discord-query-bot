'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printServerStatus = undefined;

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printServerStatus = exports.printServerStatus = function printServerStatus(_ref) {
  var info = _ref.info,
      players = _ref.players;

  var richEmbed = new _discord2.default.RichEmbed();
  var desc = '**Map:** ' + info.mapname + ' \n **Players:** ' + info.numplayers + '/' + info.maxplayers + ' ';
  richEmbed.setTitle(info.hostname);
  richEmbed.setColor('#838282');
  richEmbed.setDescription(desc);
  return richEmbed;
};