export default class Game{ //Control class
    constructor({world, view, levels}){ //Определение конструктора
        this.world = world;
        this.view = view;
        this.levels = levels;
        this.level = 0;
        this.activeKeys = new Set(); // коллекция, не имеет повторяющихся значений. хранит нажатую клавишу

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
        this.world.setLevel(this.levels[this.level]); // Передаем в метод setLevel наш массив с уровнем(расстановка объектов)
        document.addEventListener('keydown', event=>{ // event.code - нажатая клавиша
            event.preventDefault(); // не прокручивается экран, при нажатии на клавишу
            switch (event.code){ // Проверяем нажатую клавишу
                case "ArrowUp":
                case "ArrowRight":
                case "ArrowDown":
                case "ArrowLeft":
                case "Space":
                case "Enter":
                   this.activeKeys.add(event.code); //  добавляем в коллекцию нажатую клавишу   
            }
        });

        document.addEventListener('keyup', event=>{ // отпускание клавиши, нет действия движения
            event.preventDefault(); // 
            switch (event.code){
                case "ArrowUp":
                case "ArrowRight":
                case "ArrowDown":
                case "ArrowLeft":
                case "Space":
                case "Enter":
                    this.activeKeys.delete(event.code); //  удаляем из коллекции нажатую клавишу   
            }       
        });
    }
    start(){ // Первый запуск цикла игры
        requestAnimationFrame(this.loop); // метод сообщает браузеру, что мы хотим выполнить анимацию
    }
    loop(){ // метод цикла игры
        
        // обновление мира world
        this.world.update(this.activeKeys); // передаем в update world нажатую клавишу key
        
        // обновленеи отрисовки view
        this.view.update(this.world); // Передаем игровой мир во view

        requestAnimationFrame(this.loop);
    }
}