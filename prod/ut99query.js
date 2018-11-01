'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryUT99Server = exports.updateQueryServer = exports.delQueryServer = exports.addQueryServer = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addQueryServer = exports.addQueryServer = function addQueryServer() {};

var delQueryServer = exports.delQueryServer = function delQueryServer() {};

var updateQueryServer = exports.updateQueryServer = function updateQueryServer() {};

var queryUT99Server = exports.queryUT99Server = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(args) {
    var _args$split, _args$split2, host, port, response, splittedResponse, filteredResult, result;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _args$split = args.split(':'), _args$split2 = (0, _slicedToArray3.default)(_args$split, 2), host = _args$split2[0], port = _args$split2[1];
            _context.next = 3;
            return _api2.default.getUT99ServerStatus(host, parseInt(port) + 1);

          case 3:
            response = _context.sent;
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
            return _context.abrupt('return', {
              info: (0, _extends3.default)({}, (0, _helpers.createObjectFromArray)(result.info), { host: host, port: port }),
              players: (0, _helpers.createObjectFromArray)(result.players)
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function queryUT99Server(_x) {
    return _ref.apply(this, arguments);
  };
}();