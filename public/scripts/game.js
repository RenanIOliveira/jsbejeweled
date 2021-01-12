import * as board from '/scripts/board.js';

var n_gems = 5;
var game_board;

/**
 * Checks gems for sequence of 3+ repeating gems.
 * @param {object} gems array of gems
 * @returns {{idx: number, count: number}|null} start and size of sequence
 */
function check_sequence(gems) {
    var idx = 0;

    while(idx < gems.length) {
        var count = 1;
        while(count < gems.length && gems[idx] == gems[idx + count]){
            count++;
        }

        if(count > 2)
            return {idx, count};

        idx += count;
    }

    return null;
}

/**
 * Applies check_sequence() for all rows and columns of the game_board.
 * @returns {{dir: number, idx: number, count: number}|null} direction (0=row | 1=column),
 start and size of sequence
 */
function check() {
    var checked = null;

    // check rows
    for(var row = 0; row < game_board.legnth; row++) {
        checked = check_sequence(game_board[row]);
        if(checked != null) {
            return {dir: 0,
                    ...checked};
        }
    }

    // check cols
    for(var col = 0; col < game_board[0].length; col++) {
        var column = [];
        for(var i = 0; i < game_board.length; i++)
            column.push(game_board[i][col]);

        checked = check_sequence(column);
        if(checked != null) {
            return {dir: 1,
                    ...checked};
        }
    }

    return null;
}

/**
 * Generates new random gems for a specific column.
 * @param {number} column index of column
 * @param {number} count number of gems to generate
 * @returns {object} array of generated gems
 */
function gen_gems(column, count) {
    var gems = [];
    var possible_gems;

    for(var i = 0; i < count; i++) {
        possible_gems = [0, 1, 1, 1, 1, 1];

        if(column > 0)
            possible_gems[game_board[i][column - 1]] = 0;

        if(column < game_board[0].length - 1){
            possible_gems[game_board[i][column + 1]] = 0;
        }

        if(gems.length > 0)
            possible_gems[gems[gems.length - 1]] = 0;

        var gem_choices = [];
        for(var j = 1; j <= n_gems; j++)
            if(possible_gems[j]) gem_choices.push(j);

        gems.push(gem_choices[Math.floor(Math.random() * gem_choices.length)]);
    }

    return gems;
}

/**
 * Makes gems fall over empty spaces (deleted gems), pushing new gems to the top
 of the column.
 * @param {number} col index of column
 * @param {number} start start of the deleted sequence
 * @param {number} count size of the deleted sequence
 * @returns {object} array containing column after fall
 */
function fall_column(column, start, count) {
    var old_column = [];
    for(var i = 0; i < game_board.length; i++)
        old_column.push(game_board[i][column]);

    return gen_gems(column, count).concat(old_column.slice(0, start),
                                          old_column.slice(start+count,
                                                           game_board.length));
}

function init() {
    // 5x5
    game_board = [[0, 1, 0, 0, 0],
                  [0, 2, 0, 0, 0],
                  [0, 3, 0, 0, 0],
                  [0, 4, 0, 0, 0],
                  [0, 5, 0, 0, 0]];
    // game_board = [[1, 2, 2, 0, 2],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5]];

}

function main() {
    init();

    console.log(fall_column(1, 2, 1));
}

main();

board.log_board(game_board);
