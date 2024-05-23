import GameObject from "./game-object.js";

export default class Base extends GameObject{
    constructor(args){
        super(args); // super вызывает конструктор из родительского класса и передает в него аргументы. 

        this.destroyed = false; // отвечает за разрушение, изначально нет разрушения 
    }

    get sprite(){
        return this.sprites[Number(this.destroyed)]; // Возвращает спрайт в зависимости от разрушения
    }
}