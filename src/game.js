export default class Game{ //Control class
    constructor({world, view, stages}){ //Определение конструктора
        this.world = world;
        this.view = view;
        this.stages = stages;
        this.stage = 0;
        this.activeKeys = new Set(); // коллекция, не имеет повторяющихся значений. хранит нажатую клавишу
        this.lastFrame = 0;
        //Получается что метод loop будет постоянно обновлять свои аргументы при помощи метода bind
        this.loop = this.loop.bind(this); //Метод bind создаёт новую функцию,( подставляя измененные значения)
                                            //  которая при вызове устанавливает 
                                            //  в качестве контекста выполнения this предоставленное значение.
                                            //   В метод также передаётся набор аргументов, 
                                            //   которые будут установлены перед переданными 
                                            //   в привязанную функцию аргументами при её вызове.
    }

    async init(){
        this.view.init(); // Отрисовка изображений
        this.world.setStage(this.stages[this.stage]); // Передаем в метод  наш массив с уровнем(расстановка объектов)
        document.addEventListener('keydown', event=>{ // event.code - нажатая клавиша
            switch (event.code){ // Проверяем нажатую клавишу
                case "ArrowUp":
                case "ArrowRight":
                case "ArrowDown":
                case "ArrowLeft":
                case "Space":
                case "Enter":
                    event.preventDefault(); // не прокручивается экран, при нажатии на клавишу
                    this.activeKeys.add(event.code); //  добавляем в коллекцию нажатую клавишу   
            }
        });

        document.addEventListener('keyup', event=>{ // отпускание клавиши, нет действия движения
            switch (event.code){
                case "ArrowUp":
                case "ArrowRight":
                case "ArrowDown":
                case "ArrowLeft":
                case "Space":
                case "Enter":
                    event.preventDefault(); // не прокручивается экран, при нажатии на клавишу
                    this.activeKeys.delete(event.code); //  удаляем из коллекции нажатую клавишу   
            }       
        });
    }
    start(){ // Первый запуск цикла игры
        requestAnimationFrame(this.loop); // метод сообщает браузеру, что мы хотим выполнить анимацию
    }
    loop(currentFrame){ // метод цикла игры
        const frameDelta = currentFrame - this.lastFrame;
        
        // обновление мира world
        this.world.update(this.activeKeys, frameDelta); // передаем в update world нажатую клавишу key
        
        // обновленеи отрисовки view
        this.view.update(this.world); // Передаем игровой мир во view
        this.lastFrame = currentFrame;
        requestAnimationFrame(this.loop);
    }
}