import { Container, TextStyle, Text } from "pixi.js";
import {IScene, GameManager} from "../GameManager";

export class GameOverScene extends Container implements IScene {
    constructor() {
        super();
        const style: TextStyle = new TextStyle({
            align: "center",
            fill: "#000000",
            fontSize: 52
        });
        const texty: Text = new Text('Game Over!', style); // Text supports unicode!
        this.addChild(texty);
        texty.y = (GameManager.getInstance().config.height - texty.height) / 2;
        texty.x = (GameManager.getInstance().config.width - texty.width) / 2;

    }

    update(): void {
        // TODO
    }
}          