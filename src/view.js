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
    async init() { // После загрузки изображения во view, метод вернет 1 в game, и даст возможность дальше выполнять код
        await this.sprite.load();
    }

    update(stage, gameOver){ // обновление отображение, принимает объект  world
        // методы описаны ниже

        this.clearScreen(); // очистка экрана 
        if(!gameOver){
            this.renderStage(stage);
            this.renderPanel(stage); 
            //this.renderGrid();
        }
        else{
            this.gameOver();
        }
       
    }


    clearScreen(){ // Очистка экрана после обновления
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height); 
    }

    renderStage(stage) {
        this.context.fillStyle = '#626262';
        this.context.fillRect(0, 0 , this.width, this.height );
        
        this.context.fillStyle = '#000000';
        this.context.fillRect(PLAYFIELD_X, PLAYFIELD_Y , PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT);

        for (const object of stage.objects) {
            const { x, y, width, height, sprite } = object;
            if(!sprite) return;
            
            this.context.drawImage(
                this.sprite.image,
                ...sprite,
                PLAYFIELD_X + x,
                PLAYFIELD_Y + y,
                width, 
                height
            );

            if (object.debug) {
                this.context.strokeStyle = '#ff0000';
                this.context.lineWidth = 2;
                this.context.strokeRect(x + 1, y + 1, width - 2, height - 2);
                object.debug = false;
            }
        }
    }
    renderPanel(stage){
        this.renderEnemyTankCounts(stage);
        this.renderPlayer1Lives(stage);
        this.renderStageNumber(stage);
        
        
    }
    
    renderGrid() { // метод отрисовки сетки
        for (let y = 0; y < NUMBER_OF_UNITS; y++) {
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
        for (let y = 0; y < NUMBER_OF_UNITS * 2; y++) {
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
        for(let i = 0; i < stage.enemyTanks.length ; i ++ ){
            
            if ( i < 10){
                
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
            else{
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
        let countLife = stage.playerTank.countLife;
        
        
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