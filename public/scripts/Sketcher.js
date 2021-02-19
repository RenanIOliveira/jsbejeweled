class Sketcher {
    /**
     * @constructor
     * @param {number} board_w
     * @param {number} board_h
     * @param {BasicIconGenerator} generator
     */
    constructor(grid_w, grid_h) {
        this.canvas = document.getElementById("bejeweled");
        this.context= this.canvas.getContext("2d");
        this.context.moveTo(0, 0);

        this.square_size =  this.canvas.width / grid_w;

        this.colors = [
            "#23001a",
            "#04ff00",
            "#0000ff",
            "#ff0000",
            "#05ffff",
            "#ff00c3",
            "#ffe100",
            "#0988ff",
            "#ffb4ad",
            "#005800"
        ];
    }

    /**
     * @method
     * @description
     * Draws square at (x, y) and fill with color of icon.
     * @param {number} x
     * @param {number} y
     * @param {number} icon
     */
    square(x, y, icon) {
        this.context.beginPath();
        this.context.rect(x, y, this.square_size, this.square_size);
        this.context.fillStyle = this.colors[icon];
        this.context.fill();
    }

    /**
     * @method
     * @description
     * Draws game grid.
     * @param {number[][]} grid
     */
    draw(grid) {
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                this.square(i * this.square_size, j * this.square_size,
                            grid[i][j]);
            }
        }

        this.context.stroke();
    }
}

export default Sketcher;
