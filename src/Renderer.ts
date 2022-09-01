import {Container, Loader, Sprite} from 'pixi.js';
import {GameManager} from './GameManager'
import {TextureKeys} from "./state/tetrominoShapes"
import {Board} from "./state/Board"
import {Tetromino} from "./state/Tetromino"

export class Renderer extends Container {
    
    private _rows:number;
    private _cols:number;
    private _rowsOffset:number;
    private _blockSize: number;
    private _textures: any;
    private _sprites:any;

    constructor(){
        super();

        let config = GameManager.getInstance().config

        this._rows = config.rows;
        this._cols = config.cols;
        this._blockSize = config.blockSize;
        this._rowsOffset = config.hiddenRows;

        this._textures = Loader.shared.resources.minos.textures;
        this._sprites = [];


        for (let i = 0; i < this._rows; ++i) {
            let row = [];
            for (let j = 0; j < this._cols; ++j) {
                let spr = new Sprite(this._textures.back);
                row.push(spr);
                spr.x = j * this._blockSize;
                spr.y = i * this._blockSize;
                this.addChild(spr);
            }
            this._sprites.push(row);
        }

    }

    updateColor(row:number, col:number, texture:TextureKeys|null){
        if (row < 0) {
            return
        }
        let sprite = this._sprites[row][col];
        if (texture) {
            if (!sprite.texture.baseTexture.textureCacheIds.includes(texture)) {
                sprite.texture = this._textures[texture]
            }
        } else {
            sprite.texture = this._textures.back;
        }
    }

    updateFromBoard(board: Board) {
        for (let i = 0; i < this._rows; ++i) {
            for (let j = 0; j < this._cols; ++j) {
                this.updateColor(i, j, board.get(i + this._rowsOffset, j));
            }
        }
    }

    updateFromTetromino(tetromino: Tetromino) {
        if (tetromino){
            tetromino.absolutePos().forEach(pos=>{
                this.updateColor(pos[0] -  this._rowsOffset, pos[1], tetromino.texture)
            })                    
        }
    }

}