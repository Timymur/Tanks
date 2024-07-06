import EventEmitter from "./event-emitter.js";
export default class GameObject extends EventEmitter { // игровой объект, хранит координаты, размеры и спрайт объекта
    
    constructor({ x, y, width, height, sprites } = {}) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprites = sprites;
        this.animationFrame = 0;
        this.frames = 0;
        this.isDestructable = false;
        this.isDestroyed = false;
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

    move(axis, value) {// функция движения, принимает ось и значение. (х или у) и (1 или -1)
        this[axis] += value * this.speed; // двигаем объект по назначенной оси на назначенное расстояние
    }

    stop() {
        this.speed = 0;
    }
}