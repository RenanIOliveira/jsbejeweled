import GameImpl from "./GameImpl.js";
import BasicIcon from "./BasicIcon.js";
import BasicIconGenerator from "./BasicIconGenerator.js";
import Cell from "./Cell.js";


const WIDTH = 10;
const HEIGHT = 10;
const ICONS = [0,1,2,3,4,5];

var game = null;

function getStartGame(width, height, generator){

    //get a initial game without repeating sequences
    let game = new GameImpl(width, height, generator);

    while(game.findRuns().length > 0)
        game = new GameImpl(width, height, generator);

    console.log(game.toString());

    return game;
}

function getMove(){
    var firstPosition = document.getElementById("first")
        .value.split(",").map(el => parseInt(el));
    var secondPosition = document.getElementById("second")
        .value.split(",").map(el => parseInt(el));

    return [firstPosition, secondPosition];
}

function makeMove(){
    let move = getMove();
    let cell1 = new Cell(move[0][0], move[0][1],
                         game.getIcon(move[0][0], move[0][1]));
    let cell2 = new Cell(move[1][0], move[1][1],
                         game.getIcon(move[1][0], move[1][1]));

    if(game.select([cell1, cell2])){

        game.removeAllRuns();
        for(let i=0; i < WIDTH; i++){
            game.fillCollumn(i);
        }
    }else{
        console.log("Invalid Move");
    }

    console.log(game.toString());
    console.log("Score: ",game.score);
}



function startGame(){
    let generator = new BasicIconGenerator(ICONS);
    game = getStartGame(WIDTH, HEIGHT, generator);
}

startGame();

document.getElementById("Move").onclick = makeMove;
