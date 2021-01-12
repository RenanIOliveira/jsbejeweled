/**
 * Utility functions
 * @module utils
 */


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param {number} min
 * @param {number} max
 * @returns {number}
*/

export function random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
