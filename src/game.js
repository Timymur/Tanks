export default class Game{ //Control class
    constructor({world, view, levels}){ //Определение конструктора
        this.world = world;
        this.view = view;
        this.levels = levels;

        //Получается что loop будет постоянно обновлять свои аргументы при помощи метода bind
        this.loop = this.loop.bind(this); //Метод bind() создаёт новую функцию,( подставляя измененные значения)
                                            //  которая при вызове устанавливает 
                                            //  в качестве контекста выполнения this предоставленное значение.
                                            //   В метод также передаётся набор аргументов, 
                                            //   которые будут установлены перед переданными 
                                            //   в привязанную функцию аргументами при её вызове.
    }

    async init(){
        this.view.init();
    }
    start(){
        requestAnimationFrame(this.loop);
    }
    loop(){ // метод цикла игры
        console.log("LOOP");
        // Получение действия

        // обновление мира world
        this.world.update();
        
        // обновленеи отрисовки view
        this.view.update(this.world); // Передаем игровой мир во view


        requestAnimationFrame(this.loop);
    }
}