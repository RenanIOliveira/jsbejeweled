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
 * Generates new random gems for a specific column.
 * @param {number} column index of column
 * @param {number} count number of gems to generate
 * @param {object} board 2d array of gems
 * @param {number} N_gems number of possible gems
 * @returns {object} array of generated gems
 */
export function gen_gems(column, count, board, N_gems) {
    var gems = [];
    var possible_gems;

    for(var i = 0; i < count; i++) {
        possible_gems = [0, 1, 1, 1, 1, 1];

        if(column > 0)
            possible_gems[board[i][column - 1]] = 0;

        if(column < board[0].length - 1)
            possible_gems[board[i][column + 1]] = 0;

        if(gems.length > 0)
            possible_gems[gems[gems.length - 1]] = 0;

        var gem_choices = [];
        for(var j = 1; j <= N_gems; j++)
            if(possible_gems[j]) gem_choices.push(j);

        gems.push(gem_choices[Math.floor(Math.random() * gem_choices.length)]);
    }

    return gems;
}
