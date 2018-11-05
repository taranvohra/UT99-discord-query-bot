'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryUT99Server = exports.updateQueryServer = exports.delQueryServer = exports.addQueryServer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringHash = require('string-hash');

var _stringHash2 = _interopRequireDefault(_stringHash);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addQueryServer = exports.addQueryServer = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref, cachedDB) {
    var _ref3 = (0, _toArray3.default)(_ref),
        _ = _ref3[0],
        hp = _ref3[1],
        args = _ref3.slice(2);

    var _hp$split, _hp$split2, host, port, _args$reduce, name, aliases, uid, newServer, result;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _hp$split = hp.split(':'), _hp$split2 = (0, _slicedToArray3.default)(_hp$split, 2), host = _hp$split2[0], port = _hp$split2[1];
            _args$reduce = args.reduce(function (acc, curr) {
              typeof curr === 'string' ? acc.name += curr + ' ' : acc.aliases = curr;
              return acc;
            }, { name: '', aliases: [] }), name = _args$reduce.name, aliases = _args$reduce.aliases;

            if (!(!host || !port || !name)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', { status: false, msg: 'Invalid command' });

          case 5:
            uid = (0, _stringHash2.default)(hp);

            if (!cachedDB.some(function (s) {
              return parseInt(s.id) === parseInt(uid);
            })) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', { status: false, msg: 'Already exists' });

          case 8:
            newServer = { host: host, port: port, name: name, aliases: aliases, timestamp: Date.now() };
            _context.next = 11;
            return _api2.default.pushToDB(uid, newServer);

          case 11:
            result = _context.sent;
            return _context.abrupt('return', result);

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', { status: false, msg: 'Something went wrong' });

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function addQueryServer(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var delQueryServer = exports.delQueryServer = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4, cachedDB) {
    var _ref6 = (0, _toArray3.default)(_ref4),
        _ = _ref6[0],
        index = _ref6[1],
        args = _ref6.slice(2);

    var uid, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            uid = (0, _helpers.getUIDFromIndex)(cachedDB, parseInt(index));

            if (uid) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return', { status: false, msg: 'Query server doesn\'t exist' });

          case 4:
            _context2.next = 6;
            return _api2.default.deleteFromDB(uid);

          case 6:
            result = _context2.sent;
            return _context2.abrupt('return', result);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            return _context2.abrupt('return', { status: false, msg: 'Something went wrong' });

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 10]]);
  }));

  return function delQueryServer(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

var updateQueryServer = exports.updateQueryServer = function updateQueryServer() {};

var queryUT99Server = exports.queryUT99Server = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(args, cachedDB) {
    var _ref8, _ref9, host, port, response, splittedResponse, filteredResult, result;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref8 = (0, _helpers.checkKeyExistenceFromIndex)(cachedDB, parseInt(args)) ? (0, _helpers.getHostAndPortOfServerFromDB)(cachedDB, parseInt(args)) : args.split(':'), _ref9 = (0, _slicedToArray3.default)(_ref8, 2), host = _ref9[0], port = _ref9[1];

            if (!(!host || !port)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt('return', { status: false, msg: 'Invalid' });

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return _api2.default.getUT99ServerStatus(host, parseInt(port) + 1);

          case 6:
            response = _context3.sent;
            splittedResponse = response.split('\\');
            filteredResult = [].concat((0, _toConsumableArray3.default)(splittedResponse));

            filteredResult.shift();
            filteredResult.unshift();
            result = filteredResult.reduce(function (acc, curr) {
              if (curr === 'player_0') acc.pFlag = true;
              acc.pFlag ? acc.players.push(curr) : acc.info.push(curr);
              return acc;
            }, {
              info: [],
              players: [],
              pFlag: false
            });

            console.log(_util2.default.inspect(filteredResult, { maxArrayLength: null }));
            return _context3.abrupt('return', {
              status: true,
              info: (0, _extends3.default)({}, (0, _helpers.createObjectFromArray)(result.info), { host: host, port: port }),
              players: (0, _helpers.createObjectFromArray)(result.players)
            });

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3['catch'](3);

            console.log(_context3.t0);
            return _context3.abrupt('return', { status: false, msg: 'Could not query' });

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 16]]);
  }));

  return function queryUT99Server(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();