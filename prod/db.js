'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MSGING_SENDER_ID
};

exports.default = _firebase2.default.initializeApp(config).database();