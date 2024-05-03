import Tank from "./tank.js";
import {CELL_SIZE, Direction} from "./constans.js";


export default class World{ // Мир
    level = null;
    player1Tank = new Tank();
    player2Tank = null;
    enemyTanks = [];

    
    setLevel(data){
            this.level = data.map((blocks,y)=>{
                return blocks.map((block, x) => {
                    return{
                        x: x *CELL_SIZE,
                        y: y *CELL_SIZE,
                        sprite: block
    
                    };
                });
            });
    }
    

    

    update(activeKeys){ 
       
        this.player1Tank.update(this, activeKeys); // функция в tank.js

    }
// Коллизия со стенами
    canMove(object){
        const{direction, speed, x, y} = object; //Вытаскиваем поля
        
        if (direction === Direction.UP){ // Если направление танка вверх, то проверяем У
            const nextY = y - speed;
            if(nextY <= 0){
                return false;
            }
            else{
                return true;
            }
        }
        else 
        if(direction === Direction.RIGHT){
            const nextX = x+ CELL_SIZE + speed;
            if(nextX >= canvas.width){
                return false;
            }
            else{
                return true;
            }
        }
        else 
        if(direction === Direction.DOWN){
            const nextY = y+ CELL_SIZE + speed;
            if(nextY >= canvas.height){
                return false;
            }
            else{
                return true;
            }
        }
        else 
        if(direction === Direction.LEFT){
            const nextX = x  - speed;
            if(nextX <= 0){
                return false;
            }
            else{
                return true;
            }
        }
        
    }

}