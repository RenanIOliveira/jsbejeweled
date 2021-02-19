class IO {
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

        this.grid_w = grid_w;
        this.grid_h = grid_h;

        // this.square_size =  this.canvas.width / grid_w;
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

        this.canvas.addEventListener("click", this.getCursorPosition.bind(this), false);
    }

    /**
     * @method
     * @description
     * Draws square at (x, y) and fill with color of icon.
     * @param {number} x
     * @param {number} y
     * @param {number} borderSize
     * @param {number} icon
     */
    square(x, y, borderSize, icon) {
        this.context.beginPath();
        this.context.rect(x + borderSize/2,
                          y + borderSize/2,
                          this.square_size - borderSize,
                          this.square_size - borderSize);
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
                this.square(i * this.square_size, j * this.square_size, 10,
                            grid[i][j]);
            }
        }

        this.context.stroke();
    }

    /**
     * @method
     * @description
     * Highligts square at pos (x, y).
     * @param {number} x
     * @param {number} y
     */
    highlightSquare(x, y) {
        this.context.beginPath();
        let border = this.square_size / 1.5;
        this.context.rect(x + border/2,
                          y + border/2,
                          this.square_size - border,
                          this.square_size - border);
        this.context.fillStyle = "#282a36";
        this.context.fill();
    }

    /**
     * @method
     * @description
     * Event listener funtion that returns position of icon clicked.
     * @returns {x: number, y: number} position of items clicked
     */
    getCursorPosition(e) {
        let canvasX = (e.pageX - this.canvas.offsetLeft);
        let canvasY = (e.pageY - this.canvas.offsetTop);
        let posX = Math.floor(canvasX / this.square_size);
        let posY = Math.floor(canvasY / this.square_size);

        this.highlightSquare(posX * this.square_size,
                             posY * this.square_size);

        return {x: posX, y: posY};
    }
}

export default IO;
