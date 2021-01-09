// var canvas = document.getElementById("bejeweled");
var n_gems = 5;
var board_h = 5;
var board_w = 5;
var board;

function log_board() {
    /* print board */
    for(var i = 0; i < board.length; i++)
        console.log(i.toString() + " - " + board[i].toString());
}

function check_sequence(gems) {
    /* Checks gems for sequence of 3+ repeating gems
       if found: returns {start of sequence, size of sequence}
       else: returns null
     */
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
    /* Applies check_sequence() for rows and columns
       if found: returns {direction: 0=row | 1=column,
                          ...check_sequence()}
       else: returns null
    */
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

function gen_gems(column, count) {
    /* Generates random gems that are different from adjacent
     */
    var gems = [];
    var possible_gems;

    for(var i = 0; i < count; i++) {
        possible_gems = [0, 1, 1, 1, 1, 1];

        if(column > 0)
            possible_gems[board[i][column - 1]] = 0;

        if(column < board_w - 1){
            possible_gems[board[i][column + 1]] = 0;
        }

        if(gems.length > 0)
            possible_gems[gems[gems.length - 1]] = 0;

        var gem_choices = [];
        for(var j = 1; j <= n_gems; j++)
            if(possible_gems[j]) gem_choices.push(j);

        console.log(gem_choices);

        gems.push(gem_choices[Math.floor(Math.random() * gem_choices.length)]);
    }

    return gems;
}

function fall_column(col) {
    return 0;
}

function init() {
    board = [[0, 1, 0, 0, 0],
             [0, 1, 0, 0, 0],
             [0, 2, 0, 0, 0],
             [0, 3, 0, 0, 0],
             [0, 4, 0, 0, 0]];
    // board = [[1, 2, 2, 0, 2],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5],
    //          [1, 2, 3, 4, 5]];

}

function main() {
    init();

    console.log(gen_gems(0, 5));
}

main();
