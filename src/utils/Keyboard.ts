class Key {
    public pressed: boolean = false;
    private repeat:number = 0;
    private repeatDelay:number = 0;
    private initialRepeatDelay = 0;
    private repeatTimer:number = 0;


    
    constructor(){
        this.repeat = 0;
        this.repeatDelay = 5;
        this.initialRepeatDelay = 2;
        this.repeatTimer = this.initialRepeatDelay
    }

    down(){
        this.pressed = true;
    }

    up(){
        this.repeat = 0;
        this.pressed = false;
        this.repeatTimer = 0;
    }

    get status():boolean{
        if (this.pressed) {
            --this.repeatTimer
            if (this.repeatTimer <= 0) {
                this.repeatTimer = (this.repeat > 0) ? this.repeatDelay : this.initialRepeatDelay;
                return true
            }
        }
        this.repeat++;
        return false
    }
}

export class Keyboard {
    private static controls:any;
    public static keys: Map<string, Key>;
    public static state: Map<string, boolean>;
    public static initialize() {
        Keyboard.controls = {"ArrowUp": "up", "ArrowDown": "down", "ArrowLeft": "left", "ArrowRight": "right", "KeyW": "up", "KeyS": "down", "KeyA": "left", "KeyD": "right", "KeyQ": "rotateLeft", "KeyE": "rotateRight"};
        Keyboard.keys = new Map<string, Key>()
        Object.keys(Keyboard.controls).forEach(key => {
            Keyboard.keys.set(key, new Key())
        })
        document.addEventListener("keydown", Keyboard.keyDown);
        document.addEventListener("keyup", Keyboard.keyUp);

    }
    private static keyDown(e: KeyboardEvent): void {
        let k:Key|undefined = Keyboard.keys.get(e.code)
        if (k) k.down();
    }
    private static keyUp(e: KeyboardEvent): void {
        let k:Key|undefined = Keyboard.keys.get(e.code)
        if (k) k.up();
    }
}