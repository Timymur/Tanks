export default class Tanks{
    direction = 0 ;// направление танка
    x = 64; //Позиция танка
    y = 192; 
    animationFrame = 0; // Кадр для анимации. 0 это первая картинка спрайта. 1 - вторая
    frames = [
        [28*0, 3, 25, 25,], // up
        [28*1, 0, 25, 25,],

        [28*6, 0, 25, 25,], // right
        [28*7, 0, 25, 25,],

        [28*4, 3, 25, 25,], // down
        [28*5, 0, 25, 25,],

        [28*2, 0, 25, 25,], // left
        [28*3, 0, 25, 25,]
    ];

    get sprite(){ // возвращает нужный спрайт в зависмости от direction
        return this.frames[this.direction*2 + this.animationFrame];
    }

    update(activeKeys){
        if(activeKeys.has("ArrowUp")){
            this.move(0, 'y', -1);
        }
        else 
        if(activeKeys.has("ArrowDown")){
            this.move(2, 'y', 1);   
        }
        else 
        if(activeKeys.has("ArrowRight")){
            this.move(1, 'x', 1);       
        }
        else 
        if(activeKeys.has("ArrowLeft")){
            this.move(3, 'x', -1);    
       }
    }

    move(direction, axis, value){
        this.direction = direction; // меняем направление
        this[axis]+=value; // меняем позицию танка
        this.animationFrame ^= 1; // ^ булевый оператор используется для переключения на противоположное. Toggle. T - триггер.

    }


    
}