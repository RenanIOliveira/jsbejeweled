import * as board from '/scripts/board.js';

let N_gems = 5;
let L_board = 5;
let game_board;

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


function init() {
    game_board = board.random_board(L_board, N_gems);
}

function main() {
    init();

    board.log_board(game_board);
}

main();
