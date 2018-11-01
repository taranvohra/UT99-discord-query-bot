/**
 * @param {String} packet
 * @description Checks whether the packet is the last packet
 * @returns {Boolean}
 */
export const checkIfFinalPacket = packet =>
  packet
    .toString()
    .split('\\')
    .some(s => s === 'final');

/**
 * @param  {Array} array
 * @description Filters out falsy values from array
 * @returns {Array}
 */
export const filterFalsyValues = array => array.filter(v => Boolean(v));

/**
 * @param  {Array} array
 * @description Creates an object from an array by taking adjacent odd and even indexes
 * @returns {Object}
 */
export const createObjectFromArray = array => {
  return array.reduce((acc, item, index, arr) => {
    if (index % 2 === 0) acc[item] = arr[index + 1];
    return acc;
  }, {});
};
