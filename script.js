// var canvas = document.getElementById("bejeweled");
// var context = canvas.getContext("2d");
// var wsize = 400;

var n_gem = 5;
var board_h = 5;
var board_w = 5;
var board;

function log_board() {
    for(var i = 0; i < board.length; i++)
        console.log(i.toString() + " - " + board[i].toString());
}

function check_sequence(gems) {
    var idx = 0;

    while(idx < gems.length) {
        var count = 1;
        while(count < gems.length && gems[idx] == gems[idx + count]){
            count++;
        }

        if(count > 2)
            return {idx, count};

        idx += count;
    }

    return null;
}

function check() {
    var checked = null;

    // check rows
    for(var row = 0; row < board_h; row++) {
        checked = check_sequence(board[row]);
        if(checked != null) {
            return {dir: 0,
                    ...checked};
        }
    }

    // check cols
    for(var col = 0; col < board_w; col++) {
        var column = [];
        for(var i = 0; i < board_h; i++)
            column.push(board[i][col]);

        console.log(column);
        checked = check_sequence(column);
        if(checked != null) {
            return {dir: 1,
                    ...checked};
        }
    }

    return null;
}


function gen_gems(col, count) {
    gems = [];

    for(var i = 0; i < count; i++) {
        var rand_gem = Math.floor(Math.random() * (n_gem - 1)) + 1;
        gems.push(rand_gem);
    }

    return gems;
}

function fall_column(col) {
    return 0;
}

function init() {
    board = [[0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0]];
    // board = [[1, 2, 2, 0, 2],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5]];

}

function main() {
    init();

    console.log(gen_gems(1, 5));
}

main();
