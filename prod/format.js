'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printServerStatus = undefined;

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printServerStatus = exports.printServerStatus = function printServerStatus(status) {
  var richEmbed = new _discord2.default.RichEmbed();
  richEmbed.setTitle(status.hostname);
  richEmbed.setColor('#838282');
  message.channel.send(richEmbed).then(function (message) {
    return console.log('Help sent');
  }).catch(console.error + ':help:');
  return;
};