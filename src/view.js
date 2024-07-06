import {NUMBER_OF_UNITS, UNIT_SIZE, TILE_SIZE , NUMBER_SPRITES, GAMEOVER} from "./constants.js";

const PLAYFIELD_X = UNIT_SIZE;
const PLAYFIELD_Y = UNIT_SIZE * 0.5;
const PLAYFIELD_WIDTH = NUMBER_OF_UNITS * UNIT_SIZE;
const PLAYFIELD_HEIGHT = NUMBER_OF_UNITS * UNIT_SIZE;
const PANEL_X = PLAYFIELD_WIDTH + PLAYFIELD_X; 
const PANEL_Y = PLAYFIELD_Y;

export default class View{ //Класс который будет отображать элементы на экране
                            //Должен имет доступ к холсту, сделаем ссылку на холст(canvas)

    constructor(canvas, context, sprite){// при передаче только canvas, при определении ctx уже в конструкторе не позволяет дальше работать с context почему-то???
        this.canvas = canvas;
        this.context = context;
        this.sprite = sprite;
    }

    get width(){
        return this.canvas.width;
    }

    get height(){
        return this.canvas.height;
    }
    async init() { // Загрузка картинки со спрайтами
        await this.sprite.load();// Браузер загрузил картинку, получает промис с класса sprite
    }

    update(stage, gameOver){ // обновление отображения 
        // методы описаны ниже

        this.clearScreen(); // очистка экрана 
        if(!gameOver){
            this.renderStage(stage); // воспроизведение уровня(отрисовка)
            this.renderPanel(stage); // отрисовка панели
            this.renderGrid(); // отрисовка сетки ( вспомогательный метод)
        }
        else{
            this.gameOver();
        }
       
    }


    clearScreen(){ // Очистка экрана после обновления
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height); 
    }

    renderStage(stage) {
        this.context.fillStyle = '#626262'; // серое поле
        this.context.fillRect(0, 0 , this.width, this.height );
        
        this.context.fillStyle = '#000000'; // черное игровое поле
        this.context.fillRect(PLAYFIELD_X, PLAYFIELD_Y , PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT);

        for (const object of stage.objects) {// stage.object хранит все объекты находящиеся на уровне, перебираем их
            const { x, y, width, height, sprite } = object; // вынимаем геттеры из объектов
            if(!sprite) return;
            
            this.context.drawImage( // отрисовываем объект
                this.sprite.image, // основная картинка со всеми спрайтами
                ...sprite, // распаковываем массив спрайтов, x, y , width, height(что , откуда и сколько вырезать со спрайта)
                PLAYFIELD_X + x, // где и сколько нарисовать на игровом поле
                PLAYFIELD_Y + y,
                width, 
                height
            );

            // if (object.debug) { // вспомогательный скрипт
            //     this.context.strokeStyle = '#ff0000';
            //     this.context.lineWidth = 2;
            //     this.context.strokeRect(x + 1, y + 1, width - 2, height - 2);
            //     object.debug = false;
            // }
        }
    }

    renderPanel(stage){ // отрисовка боковой панели
        this.renderEnemyTankCounts(stage);// счет танков противников
        this.renderPlayer1Lives(stage); // количество жизней игрового танка
        this.renderStageNumber(stage); // номер уровня
    }
    
    renderGrid() { // метод отрисовки сетки (вспомогательный метод)
        for (let y = 0; y < NUMBER_OF_UNITS; y++) { // толстая сетка
            for (let x = 0; x < NUMBER_OF_UNITS; x++) {
                this.context.strokeStyle = '#ffffff';
                this.context.lineWidth = .2;
                this.context.strokeRect(
                    (x * UNIT_SIZE + 1) + PLAYFIELD_X,
                    (y * UNIT_SIZE + 1) + PLAYFIELD_Y,
                    UNIT_SIZE - 2, 
                    UNIT_SIZE - 2);
            }
        }
        for (let y = 0; y < NUMBER_OF_UNITS * 2; y++) { // тонкая сетка 
            for (let x = 0; x < NUMBER_OF_UNITS * 2; x++) {
                this.context.strokeStyle = '#ffffff';
                this.context.lineWidth = .1;
                this.context.strokeRect(
                    (x * TILE_SIZE + 1) + PLAYFIELD_X, 
                    (y * TILE_SIZE + 1) + PLAYFIELD_Y, 
                    TILE_SIZE - 2, 
                    TILE_SIZE - 2);
            }
        }
    }
    
    renderEnemyTankCounts(stage){
        for(let i = 0; i < stage.enemyTanks.length ; i ++ ){ // Перебираем массив с танками противниками
            
            if ( i < 10){ // до 10 рисуем левый столбик
                
                this.context.drawImage(
                    this.sprite.image,
                    UNIT_SIZE * 20,
                    UNIT_SIZE * 12,
                    TILE_SIZE,
                    TILE_SIZE,
                    PANEL_X + 1 * TILE_SIZE , 
                    PANEL_Y + i * TILE_SIZE , 
                    TILE_SIZE -3, 
                    TILE_SIZE -3
                );
            }
            else{ // после 10 рисуем правый столбик
                this.context.drawImage(
                    this.sprite.image,
                    UNIT_SIZE * 20,
                    UNIT_SIZE * 12,
                    TILE_SIZE,
                    TILE_SIZE,
                    PANEL_X + 2 * TILE_SIZE , 
                    PANEL_Y + i * TILE_SIZE - 160 , 
                    TILE_SIZE-3, 
                    TILE_SIZE-3
                );
            }
        } 
    }

    renderPlayer1Lives(stage){ // 1Р отрисовка
        this.context.drawImage(
            this.sprite.image,
            UNIT_SIZE * 23.5,
            UNIT_SIZE * 8.5,
            UNIT_SIZE,
            TILE_SIZE,
            PANEL_X +  TILE_SIZE , 
            PANEL_Y +  PLAYFIELD_HEIGHT *0.5, 
            UNIT_SIZE, 
            TILE_SIZE
        );

        this.context.drawImage( // Красный танк
            this.sprite.image,
            UNIT_SIZE * 23.5,
            UNIT_SIZE * 9,
            TILE_SIZE,
            TILE_SIZE,
            PANEL_X +  TILE_SIZE , 
            PANEL_Y +  PLAYFIELD_HEIGHT *0.5 + TILE_SIZE , 
            TILE_SIZE, 
            TILE_SIZE
        );

        let countLife = stage.playerTank.countLife; // количество жизней игрового танка
        this.context.drawImage( // количество жизней
            this.sprite.image,
            ...NUMBER_SPRITES[countLife],
            PANEL_X +  TILE_SIZE + 16, 
            PANEL_Y +  PLAYFIELD_HEIGHT *0.5 + TILE_SIZE , 
            TILE_SIZE, 
            TILE_SIZE
        );
    }

    renderStageNumber(stage){
        this.context.drawImage(  // Флаг
            this.sprite.image,
            UNIT_SIZE * 23.5,
            UNIT_SIZE * 11.5,
            UNIT_SIZE,
            UNIT_SIZE,
            PANEL_X +  TILE_SIZE , 
            PANEL_Y +  PLAYFIELD_HEIGHT *0.75, 
            UNIT_SIZE, 
            UNIT_SIZE
        );
        this.context.drawImage( // Номер уровня
            this.sprite.image,
            ...NUMBER_SPRITES[1],
            PANEL_X + 2* TILE_SIZE , 
            PANEL_Y +  PLAYFIELD_HEIGHT *0.75+ UNIT_SIZE , 
            TILE_SIZE, 
            TILE_SIZE
        );
        
    }

    gameOver(){
        this.context.drawImage(  // gameOver
            this.sprite.image,
            ...GAMEOVER,
            PLAYFIELD_WIDTH * 0.5, 
            PLAYFIELD_HEIGHT* 0.5,
            UNIT_SIZE *2, 
            UNIT_SIZE
        );
    }
    
}