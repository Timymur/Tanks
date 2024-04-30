export default class Tanks{
    direction = 0 ;// направление танка
    x = 20; //Позиция танка
    y = 20; 
    animationFrame = 0; // Кадр для анимации. 0 это первая картинка спрайта. 1 - вторая
    frames = [
        [28*0, 3, 25, 25,], // up
        [28*1, 0, 25, 25,],

        [28*6, 0, 25, 25,], // right
        [28*7, 0, 25, 25,],

        [28*4, 3, 25, 25,], // down
        [28*5, 0, 25, 25,],

        [28*2, 0, 25, 25,], //
        [28*3, 0, 25, 25,]
    ];

    get sprite(){ // возвращает нужный спрайт в зависмости от direction
        return this.frames[this.direction*2 + this.animationFrame];
    }


    
}