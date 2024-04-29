export default class View{ //Класс который будет отображать элементы на экране
                            //Должен имет доступ к холсту, сделаем ссылку на холст(canvas)

    constructor(context, sprite){
        this.context = context;
        this.sprite = sprite;
    }

    async init(){
        await this.sprite.load();
    }
    update(){
        
    }
}