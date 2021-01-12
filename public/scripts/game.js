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

/**
 * Applies check() and removes sequence if found
 * @returns {Object|null} board with -1 where gems were removed or null
 start and size of sequence
*/
function remove_sequence() {
    let checked = check(game_board);
    let changed_board = game_board;

    if(checked == null) return null;

    if(dir == 1) {
        for(let i = start; i < start + count; i++)
            changed_board[i][idx] = -1;
    } else {
        for(let i = start; i < start + count; i++)
            changed_board[idx][i] = -1;
    }

    return changed_board;
}

function init() {
    game_board = board.random_board(L_board, N_gems);
}

function game_loop() {
    let playing = true;

    while(playig) {
        let removed = remove_sequence();
        while(removed != null) {
            game_board = removed;
            board.log_board(game_board);
            removed = remove_sequence();
        }

        swap_pair = get_swap_pair();

        board = swap(swap_pair);
    }
}

function main() {
    init();

    board.log_board(game_board);
}

main();
