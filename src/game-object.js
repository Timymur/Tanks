export default class GameObject { // игровой объект, хранит координаты, размеры и спрайт объекта
    static Direction = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    };
    
    constructor({ x, y, width, height, sprites } = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprites = sprites;
        this.animationFrame = 0;
        this.frames = 0;
    }

    // методы возвращения границ объекта
    get top() {
        return this.y;
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    get left() {
        return this.x;
    }
    update(){
        
    }

    hit(){
        
    }
}