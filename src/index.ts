import config from './config';
import { GameManager } from './GameManager';
import { LoaderScene } from './scenes/LoaderScene';


GameManager.init(config.gameConfig);

// We no longer need to tell the scene the size because we can ask Manager!
const loader: LoaderScene = new LoaderScene();
GameManager.getInstance().changeScene(loader);