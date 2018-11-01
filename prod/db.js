'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  apiKey: 'AIzaSyD98HP-Jq52vLzSDe_p_kmywGNjH6FjdiQ',
  authDomain: 'ut99-query-bot.firebaseapp.com',
  databaseURL: 'https://ut99-query-bot.firebaseio.com',
  projectId: 'ut99-query-bot',
  storageBucket: 'ut99-query-bot.appspot.com',
  messagingSenderId: '62258985101'
};

exports.default = _firebase2.default.initializeApp(config).database();