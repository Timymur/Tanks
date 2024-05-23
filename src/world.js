import Tank from "./tank.js";
import Base from './base.js';
import Stage from './stage.js';
import * as constans from "./constans.js";


export default class World{ // Мир
    constructor() {
        this.stage = null; // Устанавливается setStage
        this.base = new Base({
            x: constans.BASE_X,
            y: constans.BASE_Y,
            width: constans.UNIT_SIZE,
            height: constans.UNIT_SIZE,
            sprites: constans.BASE_SPRITES
        });

        this.player1Tank = new Tank({
            x: constans.PLAYER1_TANK_START_X,
            y: constans.PLAYER1_TANK_START_Y,
            width: constans.TANK_WIDTH,
            height: constans.TANK_HEIGHT,
            sprites: constans.PLAYER1_TANK_SPRITES,
            direction: constans.Direction.UP,
            speed: constans.TANK_SPEED
        });
        this.player2Tank = null;
        this.bullets = [];
        this.enemyTanks = [];
    }
    // возврат размеров игрового мира
    get width(){
        return constans.WORLD_SIZE;
    }
    get height(){
        return constans.WORLD_SIZE;
    }

    get top(){
        return 0;
    }

    get right(){
        return this.width;
    }

    get bottom(){
        return this.height;
    }

    get left(){
        return 0;
    }

    // возврат объектов игрового мира
    get objects() {
        return [this.base, this.player1Tank, ...this.stage.objects, ...this.enemyTanks, ...this.bullets];
    }

    setStage(data) { // Установка уровня
        this.stage = new Stage(data);
        
    }
   
    update(activeKeys, frameDelta){ // Обновление мира, принимает нажатую клавишу
       this.objects.forEach(object => object.update(this, activeKeys, frameDelta))
     
        
    }

    hasCollision(object) {
        const collision = this.getCollision(object);

        return Boolean(collision);
    }

    getCollision(object){
        const collisionObject = this.getCollisionObject(object);

        if (collisionObject) {
            collisionObject.debug = true;

            return { object: collisionObject };
        }
    }

    getCollisionObject(object) {
        return this.stage.objects
            .find(block => block && this.haveCollision(object, block));
    }

    haveCollision(a, b) {
        return (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
        );
    }


    isOutOfBounds(object){ //Проверка на выход за границы экрана
        return(
            object.top< this.top ||
            object.right > this.right||
            object.bottom  > this.bottom||
            object.left < this.left
        );
    }


   

    
}
