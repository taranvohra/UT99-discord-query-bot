'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _discord = require('discord.js');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _constants = require('./constants');

var _ut99query = require('./ut99query');

var _formats = require('./formats');

var _helpers = require('./helpers');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var cachedDB = {};
var disabledEvents = ['TYPING_START', 'CHANNEL_UPDATE', 'USER_UPDATE'];
var bot = new _discord.Client({ disabledEvents: disabledEvents });

bot.on('ready', function () {
  console.log('ready');
});

bot.on('message', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
    var args, roles, result, _result, _result2;

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
            roles = message.member.roles;
            _context.t0 = args[0];
            _context.next = _context.t0 === _constants.commands.servers ? 9 : _context.t0 === ((0, _helpers.checkIfRoleIsPrivileged)(roles) && _constants.commands.addqueryserver) ? 11 : _context.t0 === ((0, _helpers.checkIfRoleIsPrivileged)(roles) && _constants.commands.delqueryserver) ? 17 : _context.t0 === ((0, _helpers.checkIfRoleIsPrivileged)(roles) && _constants.commands.updatequeryserver) ? 23 : _context.t0 === _constants.commands.queryut99server ? 25 : 30;
            break;

          case 9:
            message.channel.send((0, _formats.printServerList)(cachedDB)).catch(console.error + ':list:');
            return _context.abrupt('break', 31);

          case 11:
            _context.next = 13;
            return (0, _ut99query.addQueryServer)(args, cachedDB);

          case 13:
            result = _context.sent;

            result.status ? updateCache(result.cache) : '';
            message.channel.send(result.msg);
            return _context.abrupt('break', 31);

          case 17:
            _context.next = 19;
            return (0, _ut99query.delQueryServer)(args, cachedDB);

          case 19:
            _result = _context.sent;

            _result.status ? updateCache(_result.cache) : '';
            message.channel.send(_result.msg);
            return _context.abrupt('break', 31);

          case 23:
            console.log(args[0]);
            return _context.abrupt('break', 31);

          case 25:
            _context.next = 27;
            return (0, _ut99query.queryUT99Server)(args[1], cachedDB);

          case 27:
            _result2 = _context.sent;

            message.channel.send(_result2.status ? (0, _formats.printServerStatus)(_result2) : _result2.msg).catch(console.error + ':query:');
            return _context.abrupt('break', 31);

          case 30:
            console.log('no match');

          case 31:
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

          bot.login(process.env.DISCORD_BOT_TOKEN);

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