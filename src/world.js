import Tank from "./tank.js";

export default class World{ // Мир
    grid = [];
    player1Tank = new Tank();
    player2Tank = null;
    enemyTanks = [];

    update(activeKeys){
       
        if(activeKeys.has("ArrowUp")){
            this.player1Tank.y-=1; // меняем позицию танка
            this.player1Tank.direction = 0; // меняем направление
            this.player1Tank.animationFrame ^= 1; // ^ булевый оператор используется для переключения на противоположное. Toggle. T - триггер.

        }
        else 
        if(activeKeys.has("ArrowDown")){
            this.player1Tank.y+=1;
            this.player1Tank.direction = 2;
            this.player1Tank.animationFrame ^= 1;
        }
        else 
        if(activeKeys.has("ArrowRight")){
            this.player1Tank.x+=1;
            this.player1Tank.direction = 1;
            this.player1Tank.animationFrame ^= 1;
        }
        else 
        if(activeKeys.has("ArrowLeft")){
            this.player1Tank.x-=1;
            this.player1Tank.direction = 3;
            this.player1Tank.animationFrame ^= 1;
            
       }

    }
}