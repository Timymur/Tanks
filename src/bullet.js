import { BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPRITES, Direction } from './constants.js';
import { getAxisForDirection, getValueForDirection } from './utils.js';
import GameObject from './game-object.js';
import BulletExplosion from './bullet-explosion.js';

export default class Bullet extends GameObject {
    constructor({ tank, direction, speed, ...args }) {
        super(args);

        this.type = 'bullet';
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.sprites = BULLET_SPRITES;
        this.direction = direction;
        this.speed = speed;
        this.tank = tank;
        this.explosion = null;
    }

    get sprite() {
        return this.sprites[this.direction];
    }

    get isExploding() {
        return Boolean(this.explosion);
    }

    get isFromEnemyTank() {
        return this.tank?.type === 'enemyTank';
    }

    get isFromPlayerTank() {
        return this.tank?.type === 'playerTank';
    }



    update({ stage }) {
        if (this.isExploding) return;
    

        const axis = getAxisForDirection(this.direction);
        const value = getValueForDirection(this.direction);

        this.move(axis, value);

        const isOutOfBounds = stage.isOutOfBounds(this);
        const collision = stage.getCollision(this);

        const shouldExplode = isOutOfBounds || collision && this.collide(collision.objects, stage);

        if (shouldExplode) {
            this.stop();
            this.explode();   
        }
    }

    


    collide(objects, stage) {
        let shouldExplode = false;

        for (const object of objects) {

            if (!this.shouldCollide(object)) continue;
            
            object.hit(this); 
            
            stage.emit("bullet.hit", object);
            shouldExplode = true;
        }

        return shouldExplode;
    }

    hit() {
        this.stop();
        this.explode();
    }

    explode() {
        const [x, y] = this.getExplosionStartingPosition();
        this.explosion = new BulletExplosion({ x, y });
        this.explosion.on('destroyed', () => this.destroy());
        this.emit('explode', this.explosion);
    }

    destroy() {
        this.tank = null;
        this.explosion = null;
        this.emit('destroyed', this);
    }

    shouldCollide(object){
        return (
            (object.type == "wall") || 
            (object.type == "base") ||
            (object.type == "playerTank" && this.isFromEnemyTank) ||
            (object.type == "enemyTank" && this.isFromPlayerTank) ||
            (object.type == "bullet" && this.isFromEnemyTank && object.isFromPlayerTank) || 
            (object.type == "bullet" && this.isFromPlayerTank && object.isFromEnemyTank)
        );

    }

    getExplosionStartingPosition() {
        switch (this.direction) {
            case Direction.UP: return [this.left - 10, this.top - 12];
            case Direction.RIGHT: return [this.right - 16, this.top - 12];
            case Direction.DOWN: return [this.left - 10, this.bottom - 16];
            case Direction.LEFT: return [this.left - 16, this.top - 12];
        }
    }
}