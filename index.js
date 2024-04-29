import World from "./src/world.js";
import View from "./src/view.js";
import Game from "./src/game.js";
import levels from "./data/levels.js";
import Sprite from "./src/sprite.js";

const canvas = document.getElementById('canvas'); //Передадим на view
const context = canvas.getContext("2d");
const sprite = new Sprite('./data/sprite.png');
new World();
new View();
//Контролирующий класс, он должен иметь доступ к объекту мира и объекту представления
const game = new Game({
    //Имя переменной: тип данных
    world: new World(),
    view: new View(context, sprite),
    levels
});


game.init().then(()=>game.start()); // после инициализации вызываем старт

console.log(game);


