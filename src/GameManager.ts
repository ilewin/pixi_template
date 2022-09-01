import { Application } from '@pixi/app';
import { DisplayObject } from '@pixi/display';

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
}

export class GameManager {
    // private static instance: SceneManager;
    private static _instance: GameManager;

    private app: Application;
    private currentScene?: IScene;

    private readonly _config:any;

    private readonly _width: number;
    private readonly _height: number;

    public getApp(): Application {
        return this.app;
    }

    public getCurrentScene(): IScene|undefined {
        return this.currentScene;
    }

    // Singleton
    public static getInstance(): GameManager {
        if (!GameManager._instance) {
            throw new Error("SceneManager is not initialized!");
        }
        return GameManager._instance;
    }

    public static init(config: any){
        this._instance = new GameManager(config);
    }

    private constructor(config: any) {
        this._config = config;
        this._width = config.width;
        this._height = config.height;
        this.app = new Application({
            width: this._width,
            height: this._height,
            backgroundColor: config.background,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            view: document.getElementById("t-canvas") as HTMLCanvasElement
        })

        this.app.ticker.add(this.update, this);
    }
    
    public get config(): any {
        return this._config;
    }

    private update(framesPassed: number): void {
        if (this.currentScene) {
            this.currentScene.update(framesPassed);
        }
    }

    public changeScene(newScene: IScene): void {
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy();
        }
        this.currentScene = newScene;
        this.app.stage.addChild(this.currentScene);
    }

}