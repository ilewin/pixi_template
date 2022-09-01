import {SHAPES,TextureKeys} from './tetrominoShapes';

export class Tetromino{
    private _shapeType: TextureKeys;
    private _rotation: number;
    private _shape: Array<Array<number>>;
    private _col: number;
    private _row: number;

    constructor(shape: TextureKeys) {
        this._shapeType = shape;
        this._rotation = 0;
        this._shape = SHAPES[shape][this._rotation];
        
  
        this._col = 0;
        this._row = 0;
    }

    rotate(){
        this._rotation = (this._rotation + 1) % 4;
        this._shape = SHAPES[this._shapeType][this._rotation];
    }

    absolutePos( shiftRow = 0, shiftCol = 0, rotate = false) :Array<Array<number>> {
        let shape = rotate ? SHAPES[this._shapeType][(this._rotation + 1) % 4] : this._shape;
        return shape.map(pos => [this._row + pos[0] + shiftRow, this._col + pos[1] + shiftCol]);
    }

    set row(r: number) {
        this._row = r;
    }

    set col(c: number) {
        this._col = c;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    get texture() {
        return this._shapeType;
    }
}