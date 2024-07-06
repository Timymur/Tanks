import Input from "./src/input.js";
import View from "./src/view.js";
import Game from "./src/game.js";
import Sprite from "./src/sprite.js";

const canvas = document.getElementById('canvas'); //Передадим на view
const context = canvas.getContext("2d"); // контекст. Это холст на котором будем рисовать
const sprite = new Sprite('assets/sprite.png'); // Спрайт. принмает картинку со спрайтами. sprite-map хранит координаты отдельных частей спрайта

//Контролирующий класс
const game = new Game({
    
    input: new Input(), // класс ввода кнопки
    view: new View(canvas, context, sprite),  
});


game.init().then(()=>game.start()); // после загрузки картинки со спрайтами запускаем игру

console.log(game);


