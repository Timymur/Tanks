import GameObject from "./game-object.js";
import { BASE_POSITION, BASE_WIDTH, BASE_HEIGHT, BASE_SPRITES } from './constans.js';
export default class Base extends GameObject{
    constructor(args){
        super(args); // super вызывает конструктор из родительского класса и передает в него аргументы. 
        this.x = BASE_POSITION[0];
        this.y = BASE_POSITION[1];
        this.width = BASE_WIDTH;
        this.height = BASE_HEIGHT;
        this.sprites = BASE_SPRITES;
        this.destroyed = false; // отвечает за разрушение, изначально нет разрушения 
    }

    get sprite(){
        return this.sprites[Number(this.destroyed)]; // Возвращает спрайт в зависимости от разрушения
    }
}