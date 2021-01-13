import * as board from '/scripts/board.js';

let N_gems = 5;
let L_board = 5;
let game_board;

/**
 * Checks gems for sequence of 3+ repeating gems.
 * @param {object} gems array of gems
 * @returns {{start: number, count: number}|null} start and size of sequence
 */
function check_sequence(gems) {
    var start = 0;

    while(start < gems.length) {
        var count = 1;
        while(count < gems.length && gems[start] == gems[start + count])
            count++;

        if(count > 2)
            return {start, count};

        start += count;
    }

    return null;
}

/**
 * Applies check_sequence() for all rows and columns of the game_board.
 * @returns {{dir: number, idx: number, start: number, count: number}|null}
 direction (0=row | 1=column), start and size of sequence
 */
function check() {
    var checked = null;

    // check rows
    for(var row = 0; row < game_board.legnth; row++) {
        checked = check_sequence(game_board[row]);
        if(checked != null) {
            return {dir: 0,
                    idx: row,
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
                    idx: col,
                    ...checked};
        }
    }

    return null;
}

/**
 * Removes found sequence.
 * @param {number} dir direction of sequence (0=row | 1=column)
 * @param {number} idx index of row or column of sequence
 * @param {number} start start index of sequence
 * @param {number} count number of gems in sequence
 * @returns {Object|null} board with -1 where gems were removed or null
 start and size of sequence
*/
function mark_sequence(dir, idx, start, count) {
    let marked_board = game_board;

    if(dir == 1) {
        for(let i = start; i < start + count; i++)
            marked_board[i][idx] = -1;
    } else {
        for(let i = start; i < start + count; i++)
            marked_board[idx][i] = -1;
    }

    return marked_board;
}

/**
 * Makes gems fall by first marking the board, then making new gems fall.
 * This is done until no more sequence are found.
 */
function fall() {
    let checked = check();

    while(checked != null) {
        // mark board
        game_board = mark_sequence(checked.dir,
                                   checked.idx,
                                   checked.start,
                                   checked.count);
        board.log_board(game_board);

        // make columns fall
        if(checked.dir == 0) {
            for(let i = checked.start; i < checked.count + checked.start; i++)
                board.fall_column(game_board, i, checked.idx, 1, N_gems);
        } else {
            board.fall_column(game_board,
                              checked.idx,
                              checked.start,
                              checked.count,
                              N_gems);
        }

        board.log_board(game_board);

        checked = check();
    }
}

/**
 * Realizes a swap move
 */
function swap() {
    return 0;
}

/**
 * Game loop
 */
function game_loop() {
    let playing = true;

    board.log_board(game_board);

    while(playing) {
        fall();

        swap();
        board.log_board(game_board);

        fall();
        playing = false;
    }
}

function init() {
    game_board = board.random_board(L_board, N_gems);
    // for(let i = 0; i < L_board; i++) {
    //     if(i < 3)
    //         game_board[i][0] = 1;
    //     else
    //         game_board[i][0] = i;
    // }
    // game_board = Array(L_board).fill(Array(L_board).fill(1));
}

function main() {
    init();
    game_loop();
}

main();
