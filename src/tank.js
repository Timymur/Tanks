import { Direction, TILE_SIZE, TANK_WIDTH, TANK_HEIGHT, TANK_SPEED, TANK_TURN_THRESHOLD, TANK_ANIMATION_FRAME } from './constants.js';
import { getAxisForDirection } from './utils.js';
import GameObject from './game-object.js';
import Bullet from "./bullet.js";
import TankExplosion from "./tank-explosion.js";

export default class Tank extends GameObject{ // танк наследуется от геймобджект 
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
        
        this.direction = direction; // текущее направление 
    
        if (direction === Direction.UP || direction === Direction.DOWN) {// если текущее направление танка по оси х
            if (prevDirection === Direction.RIGHT) { // а предыдущее вправо 
                const value = TILE_SIZE - (this.x % TILE_SIZE);// записываем в value  разницу между клетками
                
                if (value <= TANK_TURN_THRESHOLD) {// если разница меньше значения дрифта танка
                    this.x += value; // то мы сдвигаем танк по иксу на эту разницу, чтобы танк вписался в поворот
                }
            } else if (prevDirection === Direction.LEFT) { // аналогично для движения влево 
                const value = this.x % TILE_SIZE;

                if (value <= TANK_TURN_THRESHOLD) {
                    this.x -= value;
                }
            } 
        } else {
            if (prevDirection === Direction.UP) { // аналогично для движения вверх
                    const value = this.y % TILE_SIZE;

                if (value <= TANK_TURN_THRESHOLD) {
                    this.y -= value;
                }
            } else if (prevDirection === Direction.DOWN) { // аналогично для движения вниз 
                    const value = TILE_SIZE - (this.y % TILE_SIZE);
                    
                if (value <= TANK_TURN_THRESHOLD) {
                    this.y += value;
                }    
            } 
        }    
    }

    animate(frameDelta) {
        this.frames += frameDelta;

        if (this.frames > 20) {// частота 
            this.animationFrame ^= 1; // данный оператор меняет значение переменной с 0 на 1 и наоборот. вследствие этого будет меняется индекс возвращаемого спрайта, что создает эффект анимации
            this.frames = 0;
        }
    }

    fire() {
        if (!this.bullet) { // если нет пули у танка
           
            const [x, y] = this.getBulletStartingPosition();    // получаем ее изначальную позицию, в зависимости от положения танка
        
            this.bullet = new Bullet({// создаем пулю
                x,
                y,
                tank: this,
                direction: this.direction,
                speed: this.bulletSpeed
            });

            this.bullet.on('destroyed', () => {// вешаем на пулю дестройет 
                this.bullet = null;           // при исполнении убираем пулю
            });

            this.emit('fire', this.bullet);// исполняем fire у танка
        }
    } 

    hit() { // при попадании пули взрыв и уничтожение
        this.explode();
        this.destroy(); 
    }

    explode() {
        if (this.isExploding) return; // если взрыв  идет, то ничего

        const [x, y] = this.getExplosionStartingPosition();// получаем позицию  взрыва

        this.explosion = new TankExplosion({ x, y });// создаем взрыв
        this.emit('explode', this.explosion);// исполняем explode у танка
    }

    destroy() {
        this.isDestroyed = true;// меняем значение 
        this.bullet = null; // обнуляем пулю и взрыв
        this.explosion = null;
        this.emit('destroyed', this);// исполняем дестрой танка
    }

    getBulletStartingPosition() {// получение стартовой позиции пули
        switch (this.direction) {// в зависимости от направления  танка, корректируем позицию пули по определенной оси
            case Direction.UP: return [this.left + 10, this.top];
            case Direction.RIGHT: return [this.right , this.top + 12];
            case Direction.DOWN: return [this.left + 10, this.bottom ];
            case Direction.LEFT: return [this.left, this.top + 12];
        }
    }

    getExplosionStartingPosition() {// получение позиции взрыва, равна позиции танка
        return [this.left, this.top];
        
    }
}