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
 * Generates a square Board with random pieces and size `L`
 * @param {number} L The size of the board
 * @param {number} N_pieces  number of diferent pieces in the game
 * @returns {Board} Random Board
 */
export function random_board(L, N_pieces){
    let board = new Array(L);

    for(let i=0; i<L; i++) {
        board[i] = new Array(L);
    }

    let random_piece = () => utils.random_int(1,N_pieces);

    for(let i = 0; i < L; i++){
        for(let j = 0 ; j < L ; j++){
            board[i][j] = random_piece();
        }
    }

    return board;
}
