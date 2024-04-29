export default class View{ //Класс который будет отображать элементы на экране
                            //Должен имет доступ к холсту, сделаем ссылку на холст(canvas)

    constructor(context, sprite){
        this.context = context;
        this.sprite = sprite;
    }

    async init() {
        await this.sprite.load();
    }

    update(world){
        this.renderPlayer1Tank(world.player1Tank);
    }

    renderPlayer1Tank(player1Tank){
        
        this.context.drawImage(
            this.sprite.image,
             0, 0, 28, 28,
             player1Tank.x, player1Tank.y,28,28
            );
    }
}