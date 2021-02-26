
import Cell from "../../../public/scripts/Cell.js";

import BasicIcon from "../../../public/scripts/BasicIcon.js";

var CellComparisonsTestData =
[
    {
        cell1 :{
            row:1,
            col:1,
            icon:2
        },
        cell2:{
            row:1,
            col:1,
            icon:2,
        },
        expected:{
            samePosition:true,
            sameIcon:true,
            equals:true,
        }
    },
    {
        cell1 :{
            row:1,
            col:2,
            icon:2
        },
        cell2:{
            row:1,
            col:1,
            icon:2,
        },
        expected:{
            samePosition:false,
            sameIcon:true,
            equals:false,
        }
    },
    {
        cell1 :{
            row:1,
            col:1,
            icon:2
        },
        cell2:{
            row:1,
            col:1,
            icon:1,
        },
        expected:{
            samePosition:true,
            sameIcon:false,
            equals:false,
        }
    },
    {
        cell1 :{
            row:1,
            col:1,
            icon:2
        },
        cell2:{
            row:1,
            col:1,
            icon:null,
        },
        expected:{
            samePosition:true,
            sameIcon:false,
            equals:false,
        }
    }
];


describe.each(CellComparisonsTestData)("Test Cell Comparisons",({cell1,cell2,expected})=>{
    let Cell1 = new Cell(cell1.row,cell1.col,new BasicIcon(cell1.icon));
    let Cell2 = new Cell(cell2.row,cell2.col,new BasicIcon(cell2.icon));

    test("test Cell.samePosition",()=>{
        expect(Cell1.samePosition(Cell2)).toBe(expected.samePosition);
        expect(Cell2.samePosition(Cell1)).toBe(expected.samePosition);
    });

    test("test Cell.sameIcon",()=>{
        expect(Cell1.sameIcon(Cell2)).toBe(expected.sameIcon);
        expect(Cell2.sameIcon(Cell1)).toBe(expected.sameIcon);
    });

    test("test Cell.equals",()=>{
        expect(Cell1.equals(Cell2)).toBe(expected.equals);
        expect(Cell2.equals(Cell1)).toBe(expected.equals);
    });

});

var CellAdjacencyTestData =
[
    {
        cell1 :{
            row:1,
            col:1,
            icon:2
        },
        cell2:{
            row:1,
            col:1,
            icon:2,
        },
        expected:{
            isAdjacent:false,
        }
    },
    {
        cell1 :{
            row:1,
            col:2,
            icon:2
        },
        cell2:{
            row:1,
            col:1,
            icon:2,
        },
        expected:{
            isAdjacent:true,
        }
    },
    {
        cell1 :{
            row:1,
            col:1,
            icon:2
        },
        cell2:{
            row:2,
            col:1,
            icon:1,
        },
        expected:{
            isAdjacent:true,

        }
    },
    {
        cell1 :{
            row:1,
            col:3,
            icon:2
        },
        cell2:{
            row:1,
            col:1,
            icon:null,
        },
        expected:{
            isAdjacent:false,
        }
    }
];

describe.each(CellAdjacencyTestData)("Test Cell Adjacency",({cell1,cell2,expected})=>{
    let Cell1 = new Cell(cell1.row,cell1.col,new BasicIcon(cell1.icon));
    let Cell2 = new Cell(cell2.row,cell2.col,new BasicIcon(cell2.icon));

    test("test Cell.isAdjacent",()=>{
        expect(Cell1.isAdjacent(Cell2)).toBe(expected.isAdjacent);
        expect(Cell2.isAdjacent(Cell1)).toBe(expected.isAdjacent);
    });
});

var InGridTestData =
[
    {
        desc:"case 1",
        cell :{
            row:1,
            col:1,
            icon:2
        },
        grid:{
            width:3,
            height:3,
        },
        expected:{
            inGrid:true
        }
    },
    {
        desc:"case 2",
        cell :{
            row:2,
            col:1,
            icon:2
        },
        grid:{
            width:2,
            height:2,
        },
        expected:{
            inGrid:false
        }
    },
    {
        desc:"case 3",
        cell :{
            row:5,
            col:0,
            icon:2
        },
        grid:{
            width:1,
            height:6,
        },
        expected:{
            inGrid:true
        }
    },
    {
        desc:"case 4",
        cell :{
            row:5,
            col:-1,
            icon:2
        },
        grid:{
            width:100,
            height:100,
        },
        expected:{
            inGrid:false
        }
    },
    {
        desc:"case 5",
        cell :{
            row:-1,
            col:5,
            icon:2
        },
        grid:{
            width:100,
            height:100,
        },
        expected:{
            inGrid:false
        }
    },
];


describe.each(InGridTestData)("Test Cell In Grid",({cell,grid,expected,desc})=>{
    let Cell1 = new Cell(cell.row,cell.col,new BasicIcon(cell.icon));

    test("test Cell.inGrid " + desc,()=>{
        expect(Cell1.inGrid(grid.width,grid.height)).toBe(expected.inGrid);
    });
});
