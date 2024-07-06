import Stage from './stage.js';
import stages from './stages.js';

export default class Game{ //Control class
    constructor({input, view}){ //Определение конструктора
        this.input = input; // Класс, отслеживающий нажатия на кнопки
        this.view = view; // Класс, отвечающий за отображение
        this.stages = stages;// Массив с расстановкой уровня, и массив с врагами
        this.player1 = null; // Класс Игрока 1
        this.player2 = null;// Класс игрока 2 ( не реализован)
        this.stage = null; // Класс Уровень, содержит все элементы, которые присутствуют на уровне. 
        this.stageIndex = 0; // Переменная для выбора уровня( пока реализован только 1 уровень)
        //this.frames = 0; // Переменная для отслеживания частоты кадров
        this.lastFrame = 0;// Вспомогательная Переменная для отслеживания частоты кадров
        this.gameOver = false; // Переменная для отслеживания конца игры
        //Метод loop будет постоянно вызываться и  обновлять свои аргументы при помощи метода bind
        this.loop = this.loop.bind(this); // bind вызывает функцию loop для принимаемого аргумента, то есть для самого объекта this
                                            
        this.onGameOver = this.onGameOver.bind(this);// onGameOver  так же обновляется при помощи bind
    }

    async init(){
        await this.view.init(); // Ждем когда браузер загрузит картинку 
        
    }
    start(){ // Первый запуск цикла игры
        this.stage = new Stage(stages[this.stageIndex]); // В перемнную stage  записываем класс stage, в который передаем массив с картой.
        this.stage.on('gameOver', this.onGameOver); // Создаем событие gameOver и записываем его в Map  в файле event-emitter. Stage наследуется от EventEmitter 
        this.stage.number = this.stageIndex + 1; // Переменная, содержащая фактический номер уровня
        requestAnimationFrame(this.loop); // метод сообщает браузеру, что мы хотим выполнить анимацию. Методу loop передается аргумент хранящий время в милисекундах с первого запуска 
    }
    
    loop(currentFrame){ // метод цикла игры. Принимает текущее время , прошедшее с первого запуска игры 
        
        const frameDelta = currentFrame - this.lastFrame; // переменная, которая хранит разницу во времени между вызовами функции анимации.

        this.stage.update(this.input, frameDelta); // Вызываем метод update в классе stage, передавая нажатую кнопку и разницу во времени
        this.view.update(this.stage, this.gameOver);// Update в классе view для перерисовки изображения, передаем уровень и состояние gameover
        //this.frames = 0;

        this.lastFrame = currentFrame; // обновление вспомогательной переменной

        requestAnimationFrame(this.loop);
    }

    onGameOver() { // Меняет состояние переменной gameover
        this.gameOver = true;
        console.log('GAME OVER');
    }
}