import {TextureKeys} from "./tetrominoShapes";
export class Board {

    private _cols: number;
    private _rows: number;
    private _grid: Array<Array<TextureKeys|null>>;
    
    constructor(rows: number, cols: number){
        this._cols = cols;
        this._rows = rows;
        this._grid = new Array<Array<TextureKeys|null>>();

        for (let i = 0; i < this._rows; ++i) {
            this._grid.push(new Array<TextureKeys|null>());
            for (let j = 0; j < this._cols; ++j) {
                this._grid[i].push(null);
            }
        }
    }

    collides( positions: Array<Array<number>> ): boolean {
        let row, col: number;
        
        for (let p of positions) {
            row = p[0];
            col = p[1];
            if (row < 0 
                || row >= this._rows
                || col < 0
                || col >= this._cols
                || this._grid[row][col] != null
            ) { 
                return true;
            }   
        }
        return false;
    }

    isRowFull(row: number): boolean {
        return this._grid[row].every(e => e != null);
    }

    setAllCells(positions: Array<Array<number>>, val: TextureKeys) {
        let rowsToCheck = new Set<number>();
        for (let p of positions) {
            this._grid[p[0]][p[1]] = val;
            rowsToCheck.add(p[0]);
        }
        return Array.from(rowsToCheck).filter(r => this.isRowFull(r));
    }

    clearFullRows(rows: Array<number>) {
        let emptyRows: Array<Array<TextureKeys|null>> = [];
        for ( let i = rows.length - 1; i >= 0; i--) {
            this._grid.splice(rows[i], 1);
            let row: Array<TextureKeys|null> = [];
            for (let j = 0; j < this._cols; ++j) {
                row.push(null);
            }
            emptyRows.push(row);
        }
        this._grid.unshift(...emptyRows);
    }

    set(row: number, col: number, val: TextureKeys): Array<number> {
        this._grid[row][col] = val;
        return (this.isRowFull(row)) ? [row] : [];
    }

    get(row: number, col: number): TextureKeys|null {
        if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
            return this._grid[row][col];
        } else {
            return null;
        }
    }

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }
}