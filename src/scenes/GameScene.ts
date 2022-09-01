import { Container } from "pixi.js";
import {IScene, GameManager} from "../GameManager";
import { GameOverScene } from "./GameOverScene";
import {Board} from "../state/Board"
import {Tetromino} from "../state/Tetromino"
import {TetrominoFactory} from "../state/TetrominoFactory";
import {Renderer} from "../Renderer";
import {Keyboard} from "../utils/Keyboard"


export class GameScene extends Container implements IScene {
    private board: Board;
    private tetromino: Tetromino|null
    private factory: TetrominoFactory;
    private fallSpeed: number;
    private fallTimer: number;
    private fallSpeedMin: number;
    private fallSpeedupStep: number;
    private fallSpeedupDelay: number;
    private fallSpeedupTimer: number;
    private dropModifier: number;
    private renderer: Renderer;
    


    constructor() {
        super();
        let config = GameManager.getInstance().config
     
        this.fallSpeed = config.fallSpeed
        this.fallTimer = this.fallSpeed
        this.fallSpeedMin = config.fallSpeedMin
        this.fallSpeedupStep = config.fallSpeedupStep
        this.fallSpeedupDelay = config.fallSpeedupDelay
        this.dropModifier = config.dropModifier
        this.fallSpeedupTimer = this.fallSpeedupDelay
        this.tetromino = null
        

        this.board = new Board(config.rows + config.hiddenRows, config.cols);
        this.factory = new TetrominoFactory();
        this.spawnTetromino();
        this.renderer = new Renderer();
        this.addChild(this.renderer)
    }


    spawnTetromino() {
        this.tetromino = this.factory.spawnNext();
        this.tetromino.row = 0;
        this.tetromino.col = (this.board.cols / 2) - 2;
        
        if (this.board.collides(this.tetromino.absolutePos(0, 0))) {
            this.lockTetromino();
            GameManager.getInstance().changeScene(new GameOverScene());
        }
    }

    update(): void {
        
        if (this.tetromino) {
            this.updateTetromino();
        }

        this.renderer.updateFromBoard(this.board);
        if (this.tetromino) this.renderer.updateFromTetromino(this.tetromino);  
    }

    lockTetromino(){
        let fullRows:number[] = [];
        if (this.tetromino) {
            fullRows = this.board.setAllCells(this.tetromino.absolutePos(), this.tetromino.texture);
        }
        this.tetromino = null

        if (fullRows.length > 0) {
            this.board.clearFullRows(fullRows);
        }
    }

    updateTetromino(){
        if (Keyboard.keys.get("ArrowUp")?.status && this.tetromino) {
            if (!this.board.collides(this.tetromino.absolutePos(0, 0, true))) {
                this.tetromino.rotate()
            } else if (!this.board.collides(this.tetromino.absolutePos(0, -1, true))){
                --this.tetromino.col;
                this.tetromino.rotate();
            } else if (!this.board.collides(this.tetromino.absolutePos(0, 1, true))){
                ++this.tetromino.col;
                this.tetromino.rotate();
            }
        } 

        if (this.tetromino && Keyboard.keys.get("ArrowLeft")?.status && !this.board.collides(this.tetromino.absolutePos(0, -1))){
            --this.tetromino.col;
        }

        if (this.tetromino && Keyboard.keys.get("ArrowRight")?.status && !this.board.collides(this.tetromino.absolutePos(0, 1))){
            ++this.tetromino.col;
        }

        let tickMod = Keyboard.keys.get("ArrowDown")?.status ? this.dropModifier : 1;
        if ((this.fallSpeedupTimer--) <= 0) {
            this.fallSpeed = Math.max(this.fallSpeedMin, this.fallSpeed - this.fallSpeedupStep);
            this.fallSpeedupTimer = this.fallSpeedupDelay; 
        }

        if ((this.fallTimer -= tickMod) <= 0 && this.tetromino) {
            if (this.board.collides(this.tetromino.absolutePos(1, 0))) {
                this.lockTetromino();
                this.spawnTetromino();
            } else {
                ++this.tetromino.row;
                this.fallTimer = this.fallSpeed;
            }
        }

    }


}