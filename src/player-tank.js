import { Keys, Direction, PLAYER1_TANK_POSITION, PLAYER1_TANK_SPRITES, TANK_SPEED, UNIT_SIZE } from './constants.js';
import { getDirectionForKeys, getAxisForDirection, getValueForDirection } from './utils.js';
import Tank from './tank.js';

export default class PlayerTank extends Tank {
    constructor(args) {
        super(args);

        this.type = "playerTank";
        this.x = PLAYER1_TANK_POSITION[0];
        this.y = PLAYER1_TANK_POSITION[1];
        this.direction = Direction.UP;
        this.speed = TANK_SPEED;
        this.sprites = PLAYER1_TANK_SPRITES;
        this.countLife = 2;
    }

    update({ input, frameDelta, stage }) {
        if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
            const direction = getDirectionForKeys(input.keys);  // Методы в utils // получение направления по кнопке
            const axis = getAxisForDirection(direction); // получение оси направления
            const value = getValueForDirection(direction); // получение значения направления ( 1 или -1)

            this.turn(direction); // Методы в tank // поворот
            this.move(axis, value);// движение
            this.animate(frameDelta);// анимация

            const isOutOfBounds = stage.isOutOfBounds(this);// проверка на выход за границы 
            const hasCollision = stage.hasCollision(this);// проверка на коллизию

            if (isOutOfBounds || hasCollision) { // если вышли за границу или встретились с объектом ,  то отменяем движение
                this.move(axis, -value);
            }
        }

        if (input.keys.has(Keys.SPACE)) {// при нажатии на пробел, вызываем метод fire
            this.fire(); // Методы в tank
        }
    }
    hit() {// при попадании пули
        
        if(this.countLife == 0){ // если нет жизней, то уничтожаем танк
            this.explode();
            this.destroy();
        }
        else{ // если жизни остались, то декрементируем счетчик и возвращаем тан в начальную позицию
            this.countLife -=1;
            this.x = 4 * UNIT_SIZE;
            this.y = 12 * UNIT_SIZE;
        }
    }
}