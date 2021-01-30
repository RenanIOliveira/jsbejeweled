import BasicIcon from "./BasicIcon.js";

class BasicIconGenerator {

    /**
     * @constructor
     * @param iconTypes An array of the possible types
     */
    constructor(iconTypes) {
        this.possibleTypes = iconTypes;
    }


    /**
     * @private
     * @method
     * @description generates a random icon taking from icon types
     * @returns {number}
     */
    _getRandomType() {
        return Math.floor(Math.random() * (this.possibleTypes.length + 1));
    }

     /**
     * @method
     * @description returns a new icon with a random type
     * @returns {BasicIcon}
     */
    generate() {
        return new BasicIcon(this._getRandomType());
    }

    /**
     * @method
     * @description inialize a 2d array with new icons
     * @param {any[][]} grid - a 2d array
     * @returns {BasicIcon[][]} - A 2d array of icons
     */
    initialize(grid){
        for(let i = 0; i < grid.length; i++)
            for(let j = 0; j < grid[0].length; j++)
                grid[i][j] = this.generate();

        return grid;
        // return grid.map(row => row.map( el => this.generate()));
    }
}


export default BasicIconGenerator;
