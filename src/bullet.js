import GameObject from "./game-object.js";
import {  getAxisForDirection, getValueForDirection } from './utils.js';

export default class Bullet extends GameObject{
    constructor({tank, direction, speed, ...args}){
        super(args);
        this.speed = speed;
        this.direction = direction;
        this.tank = tank;
        this.isExploding = false;
        this.isDestroyed = false;
        
    }
    get sprite(){
      
        return this.sprites[this.animationFrame]; 
        

    }
    update(world, activeKeys, frameDelta){
        if(this.isDestroyed) return this.destroy(world);

        this.animate(frameDelta);
        this.move(world);

    }

    move(world){
        const axis = getAxisForDirection(this.direction);
        const value = getValueForDirection(this.direction);
        const delta = value * this.speed;

        
        this[axis] += delta; 

        const isOutOfBounds = world.isOutOfBounds(this);
        const hasCollision = world.hasCollision(this);

        
        if (isOutOfBounds || hasCollision) {
            this.speed = 0;
            this.isExploding = true;
            
        }

    }

    animate(frameDelta){
        this.frames += frameDelta;

        

        if(!this.isDestroyed && !this.isExploding){
            return ;
        }


        if(this.animationFrame === 4 ){
            this.isDestroyed = true;
        }
        else if(this.frames > 30){
            this.animationFrame +=1;
            this.frames = 0;
        }
    }

    destroy(world){
        this.tank.bullet = null;
        world.bullets = world.bullets.filter(bullet=> bullet !== this);
        
    }
}