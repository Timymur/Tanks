import World from "./src/world.js";
import View from "./src/view.js";
import Game from "./src/game.js";
import stages from "./data/stages.js";
import Sprite from "./src/sprite.js";


const canvas = document.getElementById('canvas'); //Передадим на view
const context = canvas.getContext("2d"); // контекст. Это холст на котором будем рисовать
const sprite = new Sprite('assets/sprite.png'); // Спрайт. принмает картинку со спрайтами. sprite-map хранит координаты отдельных частей спрайта


new World(); // объект , который содержит отображение уровня и проверки на движение
new View(); // объект . который отвечает за отображение

//Контролирующий класс, он  имеeт доступ к объекту мира и объекту представления
const game = new Game({
    //Имя переменной: тип данных. Передаем в конструктор
    world: new World(),
    view: new View(canvas, context, sprite),
    stages // уровни
});


game.init().then(()=>game.start()); // после инита вызываем старт

console.log(game);


