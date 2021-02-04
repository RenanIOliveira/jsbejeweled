import GameImpl from "../../../public/scripts/GameImpl.js";
import BasicIconGenerator from "../../../public/scripts/BasicIconGenerator";
import BasicIcon from "../../../public/scripts/BasicIcon.js";
import Cell from "../../../public/scripts/Cell.js";

function BuildGrid(types) {
    let grid = Array.from(Array(types.length), () => new Array(types[0].length));
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < types[0].length; j++) {
            grid[i][j] = new BasicIcon(types[i][j]);

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
        desc: "case 5: Should find run of more than 3 items",
        types:
            [[1, 2, 3, 4, 5, 1, 2],
             [2, 1, 4, 3, 1, 3, 2],
             [1, 2, 5, 5, 3, 1, 4],
             [2, 1, 4, 3, 1, 3, 1],
             [2, 2, 2, 2, 2, 2, 2]],
        expectedNumberOfIcons: 7
    },
];

describe.each(findRunsTestData)(
    "Test findRuns Should Find the proper number of icons",
    ({desc, types, expectedNumberOfIcons}) => {

    var generator = new BasicIconGenerator([1, 2, 3, 4, 5]);

    test(desc, ()=>{
        let game = new GameImpl(types[0].length, types.length, generator);

        game.grid = BuildGrid(types);

        expect(game.findRuns().length).toBe(expectedNumberOfIcons);
    });
});

const selectTestData = [
    {
        desc: "case 1: Should return true",
        cells: [
            new Cell(1, 1, new BasicIcon(1)),
            new Cell(1, 2, new BasicIcon(3))
        ],
        expectedOut: true
    },
    {
        desc: "case 2: Should return false (only one cell)",
        cells: [
            new Cell(1, 1, new BasicIcon(1)),
        ],
        expectedOut: false
    },
    {
        desc: "case 3: Should return false (same icon)",
        cells: [
            new Cell(1, 1, new BasicIcon(1)),
            new Cell(1, 2, new BasicIcon(1)),
        ],
        expectedOut: false
    },
    {
        desc: "case 3: Should return false (same not adjacent)",
        cells: [
            new Cell(1, 1, new BasicIcon(1)),
            new Cell(1, 3, new BasicIcon(2)),
        ],
        expectedOut: false
    },
];

describe.each(selectTestData)(
    "Test select",
    ({desc, cells, expectedOut}) => {

    var generator = new BasicIconGenerator([1, 2, 3, 4, 5]);

    test(desc, ()=>{
        let game = new GameImpl(10, 10, generator);

        expect(game.select(cells)).toBe(expectedOut);
    });
});

const collapseCollumnTestData = [
    {
        desc: "case 1: should shift down 2 icons by 1 step and return correct cells",
        icons: [
            [1, 1],
            [2, 2],
            [null, 3],
            [4, 4],
            [5, 5],
        ],
        col: 0,
        expectedCells: [
            null,
            new Cell(1, 0, new BasicIcon(1), 0),
            new Cell(2, 0, new BasicIcon(2), 1),
            new Cell(3, 0, new BasicIcon(4)),
            new Cell(4, 0, new BasicIcon(5)),
        ],
    },
    {
        desc: "case 2: should and shift down 2 icons by 2 steps and return correct cells",
        icons: [
            [1, 1],
            [2, 2],
            [3, null],
            [4, null],
            [5, 5],
        ],
        col: 1,
        expectedCells: [
            null,
            null,
            new Cell(2, 1, new BasicIcon(1), 0),
            new Cell(3, 1, new BasicIcon(2), 1),
            new Cell(4, 1, new BasicIcon(5)),
        ],
    },
    {
        desc: "case 3: should and shift down 2 icons by 2 steps and return correct cells",
        icons: [
            [1, null],
            [2, 2],
            [3, 3],
            [4, null],
            [5, 5],
        ],
        col: 1,
        expectedCells: [
            null,
            null,
            new Cell(2, 1, new BasicIcon(2), 1),
            new Cell(3, 1, new BasicIcon(3), 2),
            new Cell(4, 1, new BasicIcon(5)),
        ],
    },
    {
        desc: "case 3: should return 5 null cells",
        icons: [
            [1, null],
            [2, null],
            [3, null],
            [4, null],
            [5, null],
        ],
        col: 1,
        expectedCells: [
            null,
            null,
            null,
            null,
            null,
        ],
    },
];

describe.each(collapseCollumnTestData)(
    "Test collapseCollumn",
    ({desc, icons, col, expectedCells}) => {
        var generator = new BasicIconGenerator([1, 2, 3, 4, 5]);

        test(desc, ()=>{
            let game = new GameImpl(icons[0].length, icons.length, generator);
            game.grid = BuildGrid(icons);

            let result = game.collapseColumn(col);
            expect(result).toStrictEqual(expectedCells);
        }
    );
});

const fillCollumnTestData = [
    {
        desc: "case 1: should return correct number of cells",
        icons: [
            [null, 1],
            [null, 2],
            [3, 3],
            [4, 4],
            [5, 5],
        ],
        col: 0,
        expectedNumber: 2
    },
    {
        desc: "case 2: should return correct number of cells",
        icons: [
            [1, null],
            [2, null],
            [3, null],
            [4, null],
            [5, 5],
        ],
        col: 1,
        expectedNumber: 4
    },
    {
        desc: "case 3: should return correct number of cells",
        icons: [
            [1, null],
            [2, null],
            [3, null],
            [4, null],
            [5, null],
        ],
        col: 1,
        expectedNumber: 5
    },
];

describe.each(fillCollumnTestData)(
    "Test fillColumn",
    ({desc, icons, col, expectedNumber}) => {
        var generator = new BasicIconGenerator([1, 2, 3, 4, 5]);

        test(desc, ()=>{
            let game = new GameImpl(icons[0].length, icons.length, generator);
            game.grid = BuildGrid(icons);

            let result = game.fillCollumn(col);
            expect(result.length).toBe(expectedNumber);
        }
    );
});
