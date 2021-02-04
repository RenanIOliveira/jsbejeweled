class Cell{
    /**
     * @constructor
     * @param {number} row
     * @param {number} col
     * @param {BasicIcon} icon
     */
    constructor(row, col, icon, previousRow=null){
        this.row = row;
        this.col = col;
        this.icon = icon;
        this.previousRow = row;
        if(previousRow !== null) this.previousRow = previousRow;
    }

    /**
     * @method
     * @description check if two cells have the same position
     * @param {Cell} other
     * @returns {boolean}
     */
    samePosition(other){
        return this.row == other.row && this.col == other.col;
    }

    /**
     * @method
     * @description check if two cells have the same icon
     * @param {Cell} other
     * @returns {boolean}
     */
    sameIcon(other){
        if(other.icon === null || this.icon === null) return false;
        return this.icon.equals(other.icon);
    }

    /**
     * @method
     * @description check if two cells are adjacent to each other
     * @param {Cell} other
     * @returns {boolean}
     */
    isAdjacent(other){
        let adjVertical = Math.abs(other.row - this.row) == 1 && this.col == other.col;
        let adjHorizontal = Math.abs(other.col - this.col) == 1 && this.row == other.row;

        return adjHorizontal || adjVertical;
    }

    /**
     * @method
     * @description check if a cell is contained in the grid
     * @param {number} width - grid's width
     * @param {number} height - grid's height
     * @returns {boolean}
     */
    inGrid(width,height){
        return this.row >= 0 && this.row < height && this.col >= 0 && this.col < width;
    }

    /**
     * @method
     * @description - checks if two cells have the same position and the same icon type
     * @param {Cell} other
     * @returns {boolean}
     */
    equals(other){
        if(this.icon === null || other.icon === null)
            return false;

        return this.samePosition(other) && this.icon.type === other.icon.type;
    }

    /**
     * @method
     * @description returns a string representing the cell in the form:<br>
     * [(row, column) icon]<br>
     * if row is the same as the previous row, or<br>
     *[(row, column) icon (previous row)]<br>
     * otherwise.<br>
     * @returns {string}
     */
    repr(){
        let icon = this.icon || "*";

        let current_position = `(${this.row},${this.col})`;
        let previousRow = this.previousRow != this.row ? ` (${this.previousRow})` : "";

        return `[${current_position} ${icon}${previousRow}]`;
    }


}

export default Cell;
