export default class Sprite{ //  класс спрайт нужен для вытаскивания отдельных элементов с картинки
    constructor(src){
        this.src =  src;
        this.image = new Image();

    }

    async load(){ // После загрузки изображений. Метод вернет 1 в view, оттуда соответственно в game
        return new Promise((resolve, reject)=>{     //Promise используется для ассинхронных вычислений, в данном случае для загрузки отображения. resolve - при успешном выполнении, reject  при провале
            this.image.src = this.src; // Приняли и установили изображение
            this.image.addEventListener('load', ()=> resolve(this)); //вешаем обработчик на событие load ,  то есть когда картинка загрузится, мы вызовем функцию resolve, которая вернет ссылку на сам(this) спрайт 
        });
    }
}