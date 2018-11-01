'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @param {String} packet
 * @description Checks whether the packet is the last packet
 * @returns {Boolean}
 */
var checkIfFinalPacket = exports.checkIfFinalPacket = function checkIfFinalPacket(packet) {
  return packet.toString().split('\\').some(function (s) {
    return s === 'final';
  });
};

/**
 * @param  {Array} array
 * @description Filters out falsy values from array
 * @returns {Array}
 */
var filterFalsyValues = exports.filterFalsyValues = function filterFalsyValues(array) {
  return array.filter(function (v) {
    return Boolean(v);
  });
};

/**
 * @param  {Array} array
 * @description Creates an object from an array by taking adjacent odd and even indexes
 * @returns {Object}
 */
var createObjectFromArray = exports.createObjectFromArray = function createObjectFromArray(array) {
  return array.reduce(function (acc, item, index, arr) {
    if (index % 2 === 0) acc[item] = arr[index + 1];
    return acc;
  }, {});
};