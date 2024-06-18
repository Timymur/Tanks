import {Direction,  BRICK_WALL_SPRITES } from './constans.js';
import Wall from './wall.js';


export default class BrickWall extends Wall {
    constructor(args) {
        super(args);

        this.sprites = BRICK_WALL_SPRITES;
        this.state = 0; 
        this.isHitting = false;
        this.isDestroyed = false;
    }

    get sprite() {
        return this.sprites[this.state];
    }

    update({ stage }) {
        if (this.isDestroyed) {
            stage.objects.delete(this);
        }
    }

    hit(bullet) {
        
        if (this.isDestroyed) return;

        this.damage += 1;

        if (this.damage === 2) {
            this.isDestroyed = true;
        }

        switch (bullet.direction) {
            case Direction.UP:
                this.state =  4;
                break;
            case Direction.LEFT:
                this.state =  3;
                break;
            case Direction.DOWN:
                this.state =  2;
                break;
            case Direction.RIGHT:
                this.state =  1;
                break;
        }
    }
}