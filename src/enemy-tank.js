import { Direction, ENEMY_TANK_START_POSITIONS, ENEMY_TANK_SPRITES, TANK_SPEED, ENEMY_TANK_TURN_TIMER_THRESHOLD } from './constants.js';
import {  getAxisForDirection, getValueForDirection } from './utils.js';
import Tank from './tank.js';

export default class EnemyTank extends Tank {
    

    constructor(args) {
        super(args);

        this.type = "enemyTank";
        this.direction = Direction.DOWN;
        this.x = 0;
        this.y = 0;
        this.speed = TANK_SPEED * 0.7;
        this.sprites = ENEMY_TANK_SPRITES[0];
        this.bulletTimer = 0;
        this.turnTimer = 0;
    }

    setPosition(positionIndex){
        this.x = ENEMY_TANK_START_POSITIONS[positionIndex][0];
        this.y = ENEMY_TANK_START_POSITIONS[positionIndex][1];
    }

    update({ stage,  frameDelta }) {
        if(this.isDestroyed){
            this.explode();
            this.destroy();
            
        }
        const direction = this.direction
        const axis = getAxisForDirection(direction);
        const value = getValueForDirection(this.direction);
        

        this.move(axis, value);
        if (this.shouldBulletRun(frameDelta)) this.fire();
        this.animate(frameDelta);

        const isOutOfBounds = stage.isOutOfBounds(this);
        const hasCollision = stage.hasCollision(this);

        if (isOutOfBounds || hasCollision) {
                
            this.move(axis, -value);
            if(this.shouldTurn(frameDelta)){
                this.turnRandomly();
            } 
        }
    }

    hit(bullet){
        if(bullet.isFromEnemyTank) return;
        super.hit();
            
    }
    shouldTurn(frameDelta){
        this.turnTimer += frameDelta;
        return this.turnTimer > ENEMY_TANK_TURN_TIMER_THRESHOLD;
    }

    turnRandomly(){
        const randomDirection =   Math.floor(Math.random() * 4);
        this.turn(randomDirection);
        this.turnTimer = 0;
    }

    shouldBulletRun(frameDelta){
        const randBulletTimer =  Math.floor(Math.random() * 100000);
        
        if ( this.bulletTimer < randBulletTimer ){
            this.bulletTimer += frameDelta;
            return false;
        }    
        else{ 
            this.bulletTimer = 0;
            return true;
        }
    }
        
}