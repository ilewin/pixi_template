import {SHAPE_TEXTURE_IDS, TextureKeys} from './tetrominoShapes';
import {Tetromino} from './Tetromino'

const ShapeTypes = Object.keys(SHAPE_TEXTURE_IDS) as string[];

export class TetrominoFactory{
    private _queue: TextureKeys[] = [];
    constructor(){
        this.refillQueue()
    }

    refillQueue(){
        let shapeKeys = ShapeTypes.join('');
        let deck = (shapeKeys + shapeKeys + shapeKeys + shapeKeys).split('');
        for (let i= deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let tmp = deck[i-1]
            deck[i-1] = deck[j]
            deck[j] = tmp
        }
        this._queue = [...deck, ...this._queue] as TextureKeys[];
    }

    spawnNext(){
        if (this._queue.length < 2) {
            this.refillQueue();
        }
        return new Tetromino(this._queue.pop() as TextureKeys);
    }

}