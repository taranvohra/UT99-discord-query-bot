'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _discord = require('discord.js');

var _constants = require('./constants');

var _ut99query = require('./ut99query');

var _formats = require('./formats');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disabledEvents = ['TYPING_START', 'CHANNEL_UPDATE', 'USER_UPDATE'];
var bot = new _discord.Client({ disabledEvents: disabledEvents });

bot.on('ready', function () {
  console.log('ready');
});

bot.on('message', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
    var args, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!message.author.equals(bot.user)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            if (message.content.startsWith(_constants.prefix)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return');

          case 4:
            args = message.content.substring(_constants.prefix.length).split(' ');
            _context.t0 = args[0];
            _context.next = _context.t0 === _constants.commands.addqueryserver ? 8 : _context.t0 === _constants.commands.delqueryserver ? 10 : _context.t0 === _constants.commands.updatequeryserver ? 12 : _context.t0 === _constants.commands.queryut99server ? 14 : 19;
            break;

          case 8:
            console.log(args[0]);
            return _context.abrupt('break', 20);

          case 10:
            console.log(args[0]);
            return _context.abrupt('break', 20);

          case 12:
            console.log(args[0]);
            return _context.abrupt('break', 20);

          case 14:
            _context.next = 16;
            return (0, _ut99query.queryUT99Server)(args[1]);

          case 16:
            result = _context.sent;

            message.channel.send((0, _formats.printServerStatus)(result)).then(function (message) {
              return console.log('Help sent');
            }).catch(console.error + ':help:');
            return _context.abrupt('break', 20);

          case 19:
            console.log('nothing');

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

bot.login('MzkzMzM1NDU3MDA3NjY1MTUy.DrsR6g.yb9uY50QHZ7s51f5dzI_G9snPvw');