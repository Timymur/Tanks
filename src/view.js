const CELL_SIZE = 26;

export default class View{ //Класс который будет отображать элементы на экране
                            //Должен имет доступ к холсту, сделаем ссылку на холст(canvas)

    constructor(canvas, context, sprite){
        this.canvas = canvas;
        this.context = context;
        this.sprite = sprite;
    }

    async init() {
        await this.sprite.load();
    }

    update(world){
        this.clearScreen();
        this.renderLevel(world.level);
        this.renderPlayer1Tank(world.player1Tank);
    }

    renderLevel(level){
        for (let i = 0; i < level.length; i++){
            for ( let j = 0; j < level[i].length; j++){
                const object = level[i][j];
                const [x,y, width, height] = this.sprite.get(object.sprite);

                this.context.drawImage(
                        this.sprite.image,
                        x,y, width, height,
                        j*CELL_SIZE, i*CELL_SIZE, width, height
                );

            }
        }
    }
    renderPlayer1Tank(player1Tank){
        
        this.context.drawImage(
            this.sprite.image,
            ...player1Tank.sprite, // откуда начать и какую область спрайта охватить. Перенесен в массив sprite /tanks.js. direction обновляется в world.js
             //... оператор расширения. Позволяет разбить массив и использовать его элементы. Заменяет запись снизу 
             //player1Tank.sprite[player1Tank.direction][0], player1Tank.sprite[player1Tank.direction][1],player1Tank.sprite[player1Tank.direction][2],player1Tank.sprite[player1Tank.direction][3],
            player1Tank.x, player1Tank.y, 25, 25 // Откуда начать(позиция игрока) и как растянуть (размер танка. должен совпадать с размером спрайта)
            );
    }

    clearScreen(){ // Очистка экрана после обновления
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height); 
    }
}