import BasicIcon from "./BasicIcon.js";
import BasicIconGenerator from "./BasicIconGenerator.js";
import Cell from "./Cell.js";



let g = new BasicIconGenerator([1,2,3]);

console.log(g)
let icon1 = g.generate();
console.log("icon1: ",icon1)

let icon2 = g.generate();
console.log("icon2: ",icon2);

console.log("icon1-type: ",icon1.type);
console.log("icon2-type: ", icon2.type);

console.log("equals? ", icon1.equals(icon2));

let arr = [[0,0],[0,0]];
console.log(g.initialize(arr))

console.log("---");
let cell1 = new Cell(1,0,icon1);
let cell2 = new Cell(0,0,icon2);
console.log(cell1,cell2);
console.log("same position? ",cell1.samePosition(cell2))
console.log("Is Adjacent? ",cell1.isAdjacent(cell2));
console.log("Cell1 In grid 2x2? ",cell1.inGrid(2,2));
console.log("Cell2 In grid 2x2? ",cell2.inGrid(2,2));
console.log("Cells equal? ",cell1.equals(cell2));
cell1.previousRow = 0;
console.log("Cell1 repr: ",cell1.repr())
console.log("Cell2 repr: ",cell2.repr())



class GameImpl{


    Base_SCORE = 10;

    DEBUG = false;


    constructor(width, height, generator){

    }
}