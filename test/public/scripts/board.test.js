
import * as board from "../../../public/scripts/board"


describe("board_to_string should return the proper string representation of the board", () => {
    test("case 1: null board", () => {
      
        let board_string = board.board_to_string(null);
        expect(board_string).toBe("");
    });

    test("case 2:",() =>{
        let input_board = [[1, 2],
                    [1, 2]];

        let expected_output = "0 - 1,2\n1 - 1,2\n"
        
        let board_string = board.board_to_string(input_board);

        expect(board_string).toBe(expected_output);
    })

    test("case 3:", () => {
        let input_board = [[1,1,1],
                           [2,2,2],
                           [3,3,3]];

        let expected_output = "0 - 1,1,1\n1 - 2,2,2\n2 - 3,3,3\n";

        let board_string = board.board_to_string(input_board);

        expect(board_string).toBe(expected_output);
    })
});


describe("random_board should generate a proper size board", () =>{
    test("2x2 board", ()=>{
        let L = 2;

        let b = board.random_board(L,4)

        expect(is_matrix_of_side_n(b,L)).toBeTruthy()
    });

    test("5x5 board", ()=>{
        let L = 5;

        let b = board.random_board(L,4)

        expect(is_matrix_of_side_n(b,L)).toBeTruthy()
    })
})

describe("random_board should generate a board with gems in the correct range",()=>{
    test("only gems equal to 1",()=>{
        let b = board.random_board(7,1);

        b.forEach(row => {
            row.forEach(el =>{
                expect(el).toBe(1);
            })
        });
    })

    test("only gems in range 1 to 10",()=>{
        let b = board.random_board(7,10);

        b.forEach(row => {
            row.forEach(el =>{
                expect(el).toBeLessThan(11);
                expect(el).toBeGreaterThan(0);
            })
        });
    })
})

/**
 * Checks if a matrix is a square matrix of side n
 * @param {any[][]} matrix  
 * @param {number} n 
 */
function is_matrix_of_side_n(matrix,n){
    let hasNRows = matrix.length == n

    let allRowsHaveSizeN = matrix.every(row => row.length == n);

    return hasNRows && allRowsHaveSizeN;
}