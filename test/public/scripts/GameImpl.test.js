import GameImpl from "../../../public/scripts/GameImpl.js";
import BasicIconGenerator from "../../../public/scripts/BasicIconGenerator";
import BasicIcon from "../../../public/scripts/BasicIcon.js";

function BuildGrid(types) {
    let grid = Array.from(Array(types.length), () => new Array(types[0].length));
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < types[0].length; j++) {
            grid[i][j] = new BasicIcon(types[i][j])

        }
    }
    return grid;
}

const findRunsTestData =
    [{
        desc: "case 1: Should find simple run",
        types:
            [[1, 2, 3, 4, 5],
             [2, 1, 4, 3, 1],
             [1, 2, 3, 4, 5],
             [2, 1, 4, 3, 1],
             [1, 2, 3, 3, 3]],
        expectedNumberOfIcons: 3
    },
    {
        desc: "case 2: Should find two runs",
        types:
            [[1, 2, 3, 4, 5],
             [2, 1, 4, 3, 1],
             [1, 2, 5, 5, 5],
             [2, 1, 4, 3, 1],
             [1, 2, 3, 3, 3]],
        expectedNumberOfIcons: 6
    },
    {
        desc: "case 3: Should find simple run in column",
        types:
            [[1, 2, 3, 4, 5],
             [2, 1, 4, 3, 1],
             [1, 2, 5, 5, 3],
             [2, 1, 4, 3, 3],
             [1, 2, 3, 2, 3]],
        expectedNumberOfIcons: 3
    },
    {
        desc: "case 4: Should find two runs in the same row",
        types:
            [[1, 2, 3, 4, 5, 1, 2],
             [2, 1, 4, 3, 1, 3, 2],
             [1, 2, 5, 5, 3, 1, 4],
             [2, 1, 4, 3, 1, 3, 1],
             [2, 2, 2, 1, 2, 2, 2]],
        expectedNumberOfIcons: 6
    },
    {
        desc: "case 3: Should find run of more than 3 items",
        types:
            [[1, 2, 3, 4, 5, 1, 2],
             [2, 1, 4, 3, 1, 3, 2],
             [1, 2, 5, 5, 3, 1, 4],
             [2, 1, 4, 3, 1, 3, 1],
             [2, 2, 2, 2, 2, 2, 2]],
        expectedNumberOfIcons: 7
    },

    ];


describe.each(findRunsTestData)("Test findRuns Should Find the proper number of icons",
                                ({desc,types,expectedNumberOfIcons}) => {

    var generator = new BasicIconGenerator([1, 2, 3, 4, 5]);

    test(desc,()=>{
        let game = new GameImpl(types[0].length, types.length, generator);

        game.grid = BuildGrid(types);

        expect(game.findRuns().length).toBe(expectedNumberOfIcons);
    });
})
