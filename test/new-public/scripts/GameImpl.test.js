
import  GameImpl from "../../../new-public/scripts/GameImpl.js"
import  BasicIconGenerator from "../../../new-public/scripts/BasicIconGenerator"
import BasicIcon from "../../../new-public/scripts/BasicIcon.js";

var g = new BasicIconGenerator([1,2,3,4])


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

        console.log(game.findRuns())
        expect(game.findRuns().length).toBeGreaterThan(0);
        
    });

    
});


