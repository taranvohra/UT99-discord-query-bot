'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _discord = require('discord.js');

var _constants = require('./constants');

var _ut99query = require('./ut99query');

var _formats = require('./formats');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cachedDB = {};
var disabledEvents = ['TYPING_START', 'CHANNEL_UPDATE', 'USER_UPDATE'];
var bot = new _discord.Client({ disabledEvents: disabledEvents });

bot.on('ready', function () {
  console.log('ready');
});

bot.on('message', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
    var args, result, _result;

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
            _context.next = _context.t0 === _constants.commands.servers ? 8 : _context.t0 === _constants.commands.addqueryserver ? 10 : _context.t0 === _constants.commands.delqueryserver ? 16 : _context.t0 === _constants.commands.updatequeryserver ? 18 : _context.t0 === _constants.commands.queryut99server ? 20 : 25;
            break;

          case 8:
            message.channel.send((0, _formats.printServerList)(cachedDB)).catch(console.error + ':list:');
            return _context.abrupt('break', 26);

          case 10:
            _context.next = 12;
            return (0, _ut99query.addQueryServer)(args, cachedDB);

          case 12:
            result = _context.sent;

            result.status ? updateCache(result.cache) : '';
            message.channel.send(result.msg);
            return _context.abrupt('break', 26);

          case 16:
            console.log(args[0]);
            return _context.abrupt('break', 26);

          case 18:
            console.log(args[0]);
            return _context.abrupt('break', 26);

          case 20:
            _context.next = 22;
            return (0, _ut99query.queryUT99Server)(args[1], cachedDB);

          case 22:
            _result = _context.sent;

            message.channel.send(_result.status ? (0, _formats.printServerStatus)(_result) : _result.msg).catch(console.error + ':query:');
            return _context.abrupt('break', 26);

          case 25:
            console.log('no match');

          case 26:
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

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _api2.default.getCopyOfDB();

        case 2:
          cachedDB = _context2.sent;

          bot.login('MzkzMzM1NDU3MDA3NjY1MTUy.DrsR6g.yb9uY50QHZ7s51f5dzI_G9snPvw');

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}))();

var updateCache = function updateCache(newCache) {
  return cachedDB = newCache;
};