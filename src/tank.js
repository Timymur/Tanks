import { Direction } from "./constans.js";
export default class Tanks{
    direction = Direction.UP ;// направление танка
    x = 64; //Позиция танка
    y = 192; 
    speed = 1;
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

    update(world, activeKeys){
        if(activeKeys.has("ArrowUp") ){
            this.turn (Direction.UP); // Меняем направление
            if(world.canMove(this)){ // Проверка на возможность движения
                this.move( 'y', -1);
            }
            
        }
        else 
        if(activeKeys.has("ArrowDown") ){
            this.turn (Direction.DOWN); 
            if(world.canMove(this)){
                this.move( 'y', 1);  
            }
             
        }
        else 
        if(activeKeys.has("ArrowRight")  ){
            this.turn (Direction.RIGHT); 
            if(world.canMove(this)  ){
                this.move( 'x', 1);      
            }
            
        }
        else 
        if(activeKeys.has("ArrowLeft")  ){
            this.turn (Direction.LEFT); 
            if(world.canMove(this)){
                this.move( 'x', -1);
            }
                
       }
    }

    turn(direction){
        this.direction = direction;
    }

    move( axis, value){
        this[axis]+=value; // меняем позицию танка
        this.animationFrame ^= 1; // ^ булевый оператор используется для переключения на противоположное. Toggle. T - триггер.

    }


    
}