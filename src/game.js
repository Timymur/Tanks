import Stage from './stage.js';
import stages from './stages.js';

export default class Game{ //Control class
    constructor({input, view}){ //Определение конструктора
        this.input = input;
        this.view = view;
        this.stages = stages;
        this.player1 = null;
        this.player2 = null;
        this.stage = null;
        this.stageIndex = 0;
        this.frames = 0;
        this.lastFrame = 0;
        this.gameOver = false;
        //Получается что метод loop будет постоянно обновлять свои аргументы при помощи метода bind
        this.loop = this.loop.bind(this); //Метод bind создаёт новую функцию,( подставляя измененные значения)
                                            //  которая при вызове устанавливает 
                                            //  в качестве контекста выполнения this предоставленное значение.
                                            //   В метод также передаётся набор аргументов, 
                                            //   которые будут установлены перед переданными 
                                            //   в привязанную функцию аргументами при её вызове.
    
        this.onGameOver = this.onGameOver.bind(this);
    }

    async init(){
        await this.view.init(); // Отрисовка изображений
        
    }
    start(){ // Первый запуск цикла игры
        this.stage = new Stage(stages[this.stageIndex]);
        this.stage.on('gameOver', this.onGameOver);
        this.stage.number = this.stageIndex + 1;
        requestAnimationFrame(this.loop); // метод сообщает браузеру, что мы хотим выполнить анимацию
    }
    loop(currentFrame){ // метод цикла игры
        const frameDelta = currentFrame - this.lastFrame;

        this.stage.update(this.input, frameDelta);
        this.view.update(this.stage, this.gameOver);
        this.frames = 0;

        this.lastFrame = currentFrame;

        requestAnimationFrame(this.loop);
    }

    onGameOver() {
        this.gameOver = true;
        console.log('GAME OVER');


    }
}