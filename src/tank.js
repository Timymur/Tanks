import { Direction, Keys, TILE_SIZE, TANK_TURN_THRESHOLD, BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPRITES, BULLET_SPEED } from "./constans.js";
import { getDirectionForKeys, getAxisForDirection, getValueForDirection } from './utils.js';
import GameObject from './game-object.js';
import Bullet from "./bullet.js";

export default class Tanks extends GameObject{
    constructor({ direction, speed, ...rest}){
        super(rest);

        this.direction = direction;// направление танка 
        this.speed = speed; // скорость танка  
        this.bullet = null;      
    }
    
    get sprite() {// у танка при движении меняется спрайт, поэтому используется this.animationFrame, который постоянно менят значение 0 1
        return this.sprites[this.direction * 2 + this.animationFrame];
    }

    update(world, activeKeys, frameDelta){// Принимает мир и нажату клавишу
        if (
            activeKeys.has(Keys.UP) ||
            activeKeys.has(Keys.RIGHT) ||
            activeKeys.has(Keys.DOWN) ||
            activeKeys.has(Keys.LEFT)
        ) {
            const direction = getDirectionForKeys(activeKeys);
            
            this.turn(world, direction);
            this.move(world, direction);
            this.animate(frameDelta);
            }
        if(activeKeys.has(Keys.SPACE)){

            this.fire(world);

        }
    }

    turn(world, direction) {
        const prevDirection = this.direction; // предыдущее направление танка
        this.direction = direction; // 
    
        if (direction === Direction.UP || direction === Direction.DOWN) { // если повернули на ось у
            if (prevDirection === Direction.RIGHT) {
                const value = TILE_SIZE - (this.x % TILE_SIZE);
                
                if (value <= TANK_TURN_THRESHOLD) {
                    this.x += value;
                }
            } else if (prevDirection === Direction.LEFT) {
                const value = this.x % TILE_SIZE;

                if (value <= TANK_TURN_THRESHOLD) {
                    this.x -= value;
                }
            } 
        } else {
                if (prevDirection === Direction.UP) {
                    const value = this.y % TILE_SIZE;

                    if (value <= TANK_TURN_THRESHOLD) {
                        this.y -= value;
                    }
                } else if (prevDirection === Direction.DOWN) {
                    const value = TILE_SIZE - (this.y % TILE_SIZE);
                    
                    if (value <= TANK_TURN_THRESHOLD) {
                        this.y += value;
                    }    
                } 
            }  
        
    }

    move( world, direction){
        const axis = getAxisForDirection(direction);
        const value = getValueForDirection(direction);
        const delta = value * this.speed;

        
        this[axis] += delta;

        const isOutOfBounds = world.isOutOfBounds(this);
        const hasCollision = world.hasCollision(this);

        if (isOutOfBounds || hasCollision) {
            this[axis] += -delta;
        }
    } 
    
    fire(world){
        
        if(!this.bullet){
            const bullet = new Bullet({
                tank: this,
                x: this.x, 
                y: this.y,
                width: BULLET_WIDTH, 
                height: BULLET_HEIGHT,
                direction: this.direction,
                speed: BULLET_SPEED,
                sprites: BULLET_SPRITES 
            });


            this.bullet= bullet;
            world.bullets.push(bullet);
            
        }
    }   

    animate(frameDelta){
        this.frames += frameDelta;
        if(this.frames > 30){
            this.animationFrame ^= 1;
            this.frames = 0;
        }
        
    }
}