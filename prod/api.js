'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dgram = require('dgram');

var _dgram2 = _interopRequireDefault(_dgram);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = function () {
  function API() {
    (0, _classCallCheck3.default)(this, API);
  }

  (0, _createClass3.default)(API, null, [{
    key: 'getUT99ServerStatus',
    value: function getUT99ServerStatus(host, port) {
      return new _promise2.default(function (resolve, reject) {
        try {
          var status = '';
          var socket = _dgram2.default.createSocket('udp4');
          var datagram = '\\status\\XServerQuery';

          socket.send(datagram, port, host, function (err) {
            if (err) reject(err);
          });

          socket.on('message', function (message, remote) {
            var unicodeValues = message.toJSON().data;
            var unicodeString = String.fromCharCode.apply(String, (0, _toConsumableArray3.default)(unicodeValues));
            status += unicodeString;
            if ((0, _helpers.checkIfFinalPacket)(unicodeString)) {
              resolve(status);
              return socket.close();
            }
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  }, {
    key: 'getCopyOfDB',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var snapshot;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _db2.default.ref('/Servers').orderByChild('timestamp').once('value');

              case 2:
                snapshot = _context.sent;
                return _context.abrupt('return', (0, _helpers.createSortedDBSnapshot)(snapshot));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCopyOfDB() {
        return _ref.apply(this, arguments);
      }

      return getCopyOfDB;
    }()
  }, {
    key: 'pushToDB',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id, payload) {
        var cache;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _db2.default.ref('/Servers/' + id).set(payload);

              case 3:
                _context2.next = 5;
                return API.getCopyOfDB();

              case 5:
                cache = _context2.sent;
                return _context2.abrupt('return', { status: true, cache: cache, msg: 'Query server added' });

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](0);

                console.log('pushToDB Error ', e);
                return _context2.abrupt('return', { status: false, msg: 'Something went wrong' });

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function pushToDB(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return pushToDB;
    }()
  }, {
    key: 'deleteFromDB',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
        var cache;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _db2.default.ref('/Servers/' + id).remove();

              case 3:
                _context3.next = 5;
                return API.getCopyOfDB();

              case 5:
                cache = _context3.sent;
                return _context3.abrupt('return', { status: true, cache: cache, msg: 'Query server removed' });

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](0);

                console.log('deleteFromDB Error ', e);
                return _context3.abrupt('return', { status: false, msg: 'Something went wrong' });

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function deleteFromDB(_x3) {
        return _ref3.apply(this, arguments);
      }

      return deleteFromDB;
    }()
  }]);
  return API;
}();

exports.default = API;