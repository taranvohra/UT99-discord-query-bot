'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryUT99Server = exports.updateQueryServer = exports.delQueryServer = exports.addQueryServer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _stringHash = require('string-hash');

var _stringHash2 = _interopRequireDefault(_stringHash);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addQueryServer = exports.addQueryServer = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref, cachedDB) {
    var _ref3 = (0, _toArray3.default)(_ref),
        _ = _ref3[0],
        hp = _ref3[1],
        args = _ref3.slice(2);

    var _hp$split, _hp$split2, host, port, _args$reduce, name, aliases, clonedDB, uid, result;

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
            clonedDB = (typeof cachedDB === 'undefined' ? 'undefined' : (0, _typeof3.default)(cachedDB)) !== 'object' ? {} : (0, _cloneDeep2.default)(cachedDB);
            uid = (0, _stringHash2.default)(hp);

            if (!clonedDB.hasOwnProperty(uid)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', { status: false, msg: 'Already exists' });

          case 9:
            console.log('1');
            clonedDB[uid] = { host: host, port: port, name: name, aliases: aliases };

            _context.next = 13;
            return _api2.default.updateDB(clonedDB);

          case 13:
            result = _context.sent;
            return _context.abrupt('return', result);

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', { status: false, msg: 'Something went wrong' });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 17]]);
  }));

  return function addQueryServer(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var delQueryServer = exports.delQueryServer = function delQueryServer() {};

var updateQueryServer = exports.updateQueryServer = function updateQueryServer() {};

var queryUT99Server = exports.queryUT99Server = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(args, cachedDB) {
    var _ref5, _ref6, host, port, response, splittedResponse, filteredResult, result;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref5 = (0, _helpers.checkKeyExistenceFromIndex)(cachedDB, parseInt(args)) ? (0, _helpers.getHostAndPortOfServerFromDB)(cachedDB, parseInt(args)) : args.split(':'), _ref6 = (0, _slicedToArray3.default)(_ref5, 2), host = _ref6[0], port = _ref6[1];

            if (!(!host || !port)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', { status: false, msg: 'Invalid' });

          case 3:
            _context2.next = 5;
            return _api2.default.getUT99ServerStatus(host, parseInt(port) + 1);

          case 5:
            response = _context2.sent;
            splittedResponse = response.split('\\');
            filteredResult = (0, _helpers.filterFalsyValues)(splittedResponse);
            result = filteredResult.reduce(function (acc, curr) {
              if (curr === 'player_0') acc.pFlag = true;
              acc.pFlag ? acc.players.push(curr) : acc.info.push(curr);
              return acc;
            }, {
              info: [],
              players: [],
              pFlag: false
            });
            return _context2.abrupt('return', {
              status: true,
              info: (0, _extends3.default)({}, (0, _helpers.createObjectFromArray)(result.info), { host: host, port: port }),
              players: (0, _helpers.createObjectFromArray)(result.players)
            });

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function queryUT99Server(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();