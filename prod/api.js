'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
          var datagram = '\\status\\';

          socket.send(datagram, port, host, function (err) {
            if (err) throw err;
          });

          socket.on('message', function (message, remote) {
            status += message.toString();
            if ((0, _helpers.checkIfFinalPacket)(message.toString())) {
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
    key: 'getObjectFromDB',
    value: function getObjectFromDB() {
      _db2.default.ref('/').once('value').then(function (value) {
        console.log(value.val());
      });
    }
  }]);
  return API;
}();

exports.default = API;