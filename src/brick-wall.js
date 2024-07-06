import {Direction,  BRICK_WALL_SPRITES } from './constants.js';
import Wall from './wall.js';


export default class BrickWall extends Wall {
    constructor(args) {
        super(args);

        
        this.sprites = BRICK_WALL_SPRITES;
        this.state = 0; // состояние , в зависимости от него отображается спрайт
        this.isDestructable = true; // разрушимость
        this.isDestroyed = false;
        this.lastHitDirection = -1;
    }

    get sprite() { // спрайт. зависит от состояния
        return this.sprites[this.state];
    }

    update({ stage }) {// если разрушен, то удаляет с уровня
        if (this.isDestroyed) {
            stage.objects.delete(this);
        }
    }

    hit(bullet) { // при попадании пули
        
        if (this.isDestroyed) return;// если разрушен, то ничего не делаем, в предыдущем методе стена удаляется

        this.damage += 1; // добавляем урон

        if (this.damage === 2) {// если урон равн 2, то стена разрушена
            this.isDestroyed = true;
        }

        switch (bullet.direction) {// в зависимотси от направления пули, меняем состояние стены.
            case Direction.UP: // пуля вверх
                this.state =  4; // состояние четыре, половинка стены сверху остается, а снизу убирается
                break;
            case Direction.LEFT: // пуля влево
                this.state =  3; // состояние 3, половина стены слева  остается,  справа убирается
                break;
            case Direction.DOWN: // пуля вниз
                this.state =  2;// состояние два , снизу остается, сверху убирается
                break;
            case Direction.RIGHT:// пуля вправо
                this.state =  1;// слева убирается, справа остается
                break;
        }
    }
}