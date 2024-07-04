import { Keys, Direction, PLAYER1_TANK_POSITION, PLAYER1_TANK_SPRITES, TANK_SPEED } from './constants.js';
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
    }

    update({ input, frameDelta, stage }) {
        if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
            const direction = getDirectionForKeys(input.keys);  // Методы в utils
            const axis = getAxisForDirection(direction);
            const value = getValueForDirection(direction);

            this.turn(direction); // Методы в tank
            this.move(axis, value);
            this.animate(frameDelta);

            const isOutOfBounds = stage.isOutOfBounds(this);
            const hasCollision = stage.hasCollision(this);

            if (isOutOfBounds || hasCollision) {
                this.move(axis, -value);
            }
        }

        if (input.keys.has(Keys.SPACE)) {
            this.fire(); // Методы в tank
        }
    }
}