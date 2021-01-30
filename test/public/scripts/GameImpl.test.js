
import  GameImpl from "../../../public/scripts/GameImpl.js"
import  BasicIconGenerator from "../../../public/scripts/BasicIconGenerator"
import BasicIcon from "../../../public/scripts/BasicIcon.js";

var g = new BasicIconGenerator([1,2,3,4,5])


function BuildGrid(types){
    let grid = Array.from(Array(types.length), () => new Array(types[0].length));
    for(let i=0; i<types.length; i++){
        for(let j=0; j<types[0].length;j++){
            grid[i][j] = new BasicIcon(types[i][j])

        }
    }
    return grid;
}

describe("Test findRuns", () => {
    test("case 1: Should find simple run", () => {

        let types = [[1,2,3,4,5],
                     [2,1,4,3,1],
                     [1,2,3,4,5],
                     [2,1,4,3,1],
                     [1,2,3,3,3]]


        let game = new GameImpl(5,5,g);
        game.grid = BuildGrid(types);

        expect(game.findRuns().length).toBe(3);
    });

    test("case 2: Should find two runs", () => {

        let types = [[1,2,3,4,5],
                     [2,1,4,3,1],
                     [1,2,5,5,5],
                     [2,1,4,3,1],
                     [1,2,3,3,3]]


        let game = new GameImpl(5,5,g);
        game.grid = BuildGrid(types);

        expect(game.findRuns().length).toBe(6);
    });

    test("case 3: Should find simple run in column", () => {

        let types = [[1,2,3,4,5],
                     [2,1,4,3,1],
                     [1,2,5,5,3],
                     [2,1,4,3,3],
                     [1,2,3,2,3]]


        let game = new GameImpl(5,5,g);
        game.grid = BuildGrid(types);

        expect(game.findRuns().length).toBe(3);
    });

    test("case 4: Should find two runs in a single row", () => {
        

        let types = [[1,2,3,4,5,1,2],
                     [2,1,4,3,1,3,2],
                     [1,2,5,5,3,1,4],
                     [2,1,4,3,1,3,1],
                     [2,2,2,1,2,2,2]]


        let game = new GameImpl(7,5,g);
        game.grid = BuildGrid(types);

        expect(game.findRuns().length).toBe(6);
    });

    
});




