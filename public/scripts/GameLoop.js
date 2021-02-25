import GameImpl from "./GameImpl.js";
import BasicIcon from "./BasicIcon.js";
import BasicIconGenerator from "./BasicIconGenerator.js";
import Cell from "./Cell.js";
import IO from "./IO.js";

const DEBUG = false;

const WIDTH = 10;
const HEIGHT = 10;
const ICONS = [0, 1, 2, 3, 4, 5];

var game = null;

function printLog(log) {
    document.getElementById("logs").textContent = log;
}

function printScore(score) {
    document.getElementById("score").textContent = score;
}

function getStartGame(width, height, generator, sketcher){

    //get a initial game without repeating sequences
    let game = new GameImpl(width, height, generator, sketcher);

    while(game.findRuns().length > 0)
        game = new GameImpl(width, height, generator, sketcher);

    if(DEBUG)
        console.log(game.toString());

    game.debug = DEBUG;

    return game;
}

function getMove(){
    // var firstPosition = document.getElementById("first")
    //     .value.split(",").map(el => parseInt(el));
    // var secondPosition = document.getElementById("second")
    //     .value.split(",").map(el => parseInt(el));

    let firstPosition = game.io.selected[0];
    let secondPosition = game.io.selected[1];

    game.io.resetSelected();

    if (firstPosition && secondPosition) {
        return [[firstPosition.x, firstPosition.y],
                [secondPosition.x, secondPosition.y]];
    } else {
        return [[0, 0], [0, 0]];
    }

}

function makeMove(){
    let move = getMove();
    let cell1 = new Cell(move[0][0], move[0][1],
                         game.getIcon(move[0][0], move[0][1]));
    let cell2 = new Cell(move[1][0], move[1][1],
                         game.getIcon(move[1][0], move[1][1]));

    if(game.select([cell1, cell2])){

        let removed = game.removeAllRuns();

        while(removed) {
            for(let i=0; i < WIDTH; i++)
                game.fillCollumn(i);

            if(DEBUG) console.log(game.toString());
            game.draw();
            removed = game.removeAllRuns();
        }
    } else {
        printLog("Invalid Move");
    }

    game.draw();
    if(DEBUG) console.log(game.toString());
    printScore(game.score);
}



function startGame(){
    let generator = new BasicIconGenerator(ICONS);
    let io = new IO(WIDTH, HEIGHT);
    game = getStartGame(WIDTH, HEIGHT, generator, io);
    game.draw();
}

startGame();

document.getElementById("Move").onclick = makeMove;
