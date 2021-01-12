/**
 * functions that operate on a board
 * @module board
 */

 /**
  * @typedef Board
  * @type {number[][]}
  */

import * as utils from "/scripts/utils.js";

/**
 * Prints the given board to the console
 * @param {Board} board  the board object
 */
export function log_board(board) {
    console.log(board_to_string(board));
}

/**
 * Converts the board to its string representation
 * @param {Board} board
 * @returns {string} String representation of the board
 */
function board_to_string(board){
    if(!board) return "";

    let board_string = "";
    for(var i = 0; i < board.length; i++)
        board_string += i + " - " + board[i] + "\n";

    return board_string;
}

/**
 * Generates a square Board with random gems and size `L`
 * @param {number} L The size of the board
 * @param {number} N_gems  number of diferent gems in the game
 * @returns {Board} Random Board
 */
export function random_board(L, N_gem){
    let board = new Array(L);

    for(let i=0; i<L; i++)
        board[i] = new Array(L);

    let random_gem = () => utils.random_int(1, N_gems);

    for(let i = 0; i < L; i++)
        for(let j = 0 ; j < L ; j++)
            board[i][j] = random_gem();

    return board;
}

/**
 * Makes gems fall over empty spaces (deleted gems), pushing new gems to the top
 of the column.
 * @param {object} board 2d array of gems
 * @param {number} col index of column
 * @param {number} start start of the deleted sequence
 * @param {number} count size of the deleted sequence
 * @returns {object} array containing column after fall
 */
// export function fall_column(board, N_gems) {
//     var old_column = [];
//     for(var i = 0; i < board.length; i++)
//         old_column.push(board[i][column]);

//     let random_gem = () => utils.random_int(1, N_gems);

//     return utils.gen_gems(column, count, board, N_gems).concat(old_column.slice(0, start),
//                                                                old_column.slice(start+count,
//                                                                                 board.length));
// }
