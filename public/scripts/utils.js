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

/**
 * Returns a random array of integers between min (incluse) and max (inclusive)
 * @param {number} size size of array
 * @param {number} min
 * @param {number} max
 * @returns {object} Array of 'size' random ints
 */
export function random_gems(size, min, max) {
    let gems = [];
    for(let i = 0; i < size; i++)
        gems.push(random_int(min, max));
    return gems;
}
