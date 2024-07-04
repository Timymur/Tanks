import { Direction, TILE_SIZE, TANK_WIDTH, TANK_HEIGHT, TANK_SPEED, TANK_TURN_THRESHOLD, TANK_ANIMATION_FRAME } from './constants.js';
import { getAxisForDirection } from './utils.js';
import GameObject from './game-object.js';
import Bullet from "./bullet.js";
import TankExplosion from "./tank-explosion.js";

export default class Tank extends GameObject{
    constructor(args) {
        super(args);

        this.width = TANK_WIDTH;
        this.height = TANK_HEIGHT;
        this.speed = TANK_SPEED;
        this.bulletSpeed = 4;
        this.bullet = null;
        this.explosion = null;
    }
    
    get isExploding(){
        return Boolean(this.explosion?.isExploding);
    }

    get sprite() {// у танка при движении меняется спрайт, поэтому используется this.animationFrame, который постоянно менят значение 0 1
        return this.sprites[this.direction * 2 + this.animationFrame];
    }

    turn(direction) {
        const prevDirection = this.direction; // предыдущее направление танка
        
        this.direction = direction; // 
    
        if (direction === Direction.UP || direction === Direction.DOWN) {
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

    animate(frameDelta) {
        this.frames += frameDelta;

        if (this.frames > 20) {
            this.animationFrame ^= 1;
            this.frames = 0;
        }
    }

    fire() {
        if (!this.bullet) {
            console.log('FIRE');
            const [x, y] = this.getBulletStartingPosition();    
        
            this.bullet = new Bullet({
                x,
                y,
                tank: this,
                direction: this.direction,
                speed: this.bulletSpeed
            });

            this.bullet.on('destroyed', () => {
                this.bullet = null;
            });

            this.emit('fire', this.bullet);
        }
    } 

    hit() {
        this.explode();
        this.destroy(); 
    }

    explode() {
        if (this.isExploding) return;

        const [x, y] = this.getExplosionStartingPosition();

        this.explosion = new TankExplosion({ x, y });
        this.emit('explode', this.explosion);
    }

    destroy() {
        this.isDestroyed = true;
        this.bullet = null;
        this.explosion = null;
        this.emit('destroyed', this);
    }

    getBulletStartingPosition() {
        switch (this.direction) {
            case Direction.UP: return [this.left + 10, this.top];
            case Direction.RIGHT: return [this.right , this.top + 12];
            case Direction.DOWN: return [this.left + 10, this.bottom ];
            case Direction.LEFT: return [this.left, this.top + 12];
        }
    }

    getExplosionStartingPosition() {
        return [this.left, this.top];
        
    }
}