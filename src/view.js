import {NUMBER_OF_UNITS, UNIT_SIZE, TILE_SIZE} from "./constans.js";

export default class View{ //Класс который будет отображать элементы на экране
                            //Должен имет доступ к холсту, сделаем ссылку на холст(canvas)

    constructor(canvas, context, sprite){// при передаче только canvas, при определении ctx уже в конструкторе не позволяет дальше работать с context почему-то???
        this.canvas = canvas;
        this.context = context;
        this.sprite = sprite;
    }

    async init() { // После загрузки изображения во view, метод вернет 1 в game, и даст возможность дальше выполнять код
        await this.sprite.load();
    }

    update(stage){ // обновление отображение, принимает объект  world
        // методы описаны ниже
        this.clearScreen(); // очистка экрана 
             
        this.renderStage(stage);
        this.renderGrid();
    }

    renderStage(stage) {
        for (const object of stage.objects) {
            const { x, y, width, height, sprite } = object;
            if(!sprite) return;
            
            this.context.drawImage(
                this.sprite.image,
                ...sprite,
                x, y, width, height
            );

            if (object.debug) {
                this.context.strokeStyle = '#ff0000';
                this.context.lineWidth = 2;
                this.context.strokeRect(x + 1, y + 1, width - 2, height - 2);
                object.debug = false;
            }
        }
    }
    
    renderGrid() { // метод отрисовки сетки
        for (let y = 0; y < NUMBER_OF_UNITS; y++) {
            for (let x = 0; x < NUMBER_OF_UNITS; x++) {
                this.context.strokeStyle = '#ffffff';
                this.context.lineWidth = .2;
                this.context.strokeRect(x * UNIT_SIZE + 1, y * UNIT_SIZE + 1, UNIT_SIZE - 2, UNIT_SIZE - 2);
            }
        }
        for (let y = 0; y < NUMBER_OF_UNITS * 2; y++) {
            for (let x = 0; x < NUMBER_OF_UNITS * 2; x++) {
                this.context.strokeStyle = '#ffffff';
                this.context.lineWidth = .1;
                this.context.strokeRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
            }
        }
    }
    

    clearScreen(){ // Очистка экрана после обновления
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height); 
    }
}