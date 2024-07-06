import GameObject from './game-object.js';

export default class Explosion extends GameObject {
    constructor(args) {
        super(args);
        this.type = "explosion";
        
    }

    get sprite() {
        return this.sprites[this.animationFrame];
    }

    get isExploding() {
        return this.animationFrame < this.sprites.length;// возвращает тру пока номер стпрайта меньше длины массива со спрайтами
    }

    update({ stage, frameDelta }) {
        if (this.isExploding) {// если взрыв еще идет, то вызываем метод анимации
            this.animate(frameDelta);
        } else {
            this.destroy(); // иначе уничтожаем взрыв
        }
    }

    animate(frameDelta) {
        this.frames += frameDelta;

        if (this.frames > 50) { // при помощи frame delta устанавливаем частоту смены спрайтов(скорость взрыва)
            this.animationFrame += 1 ; //меняем спрайт
            this.frames = 0;
        }
    }

    hit() {// при попадании пули, ничего не происходит
        return;
    }

    destroy() {
        this.emit('destroyed', this);// исполняем дестрой взрыва
    }
}