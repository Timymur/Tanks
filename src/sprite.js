export default class Sprite{ //  класс спрайт нужен для вытаскивания отдельных элементов с картинки
    constructor(src, map){
        this.map = map;
        this.src =  src;
        this.image = new Image();

    }

    set (id, {x, y, width, height}){
        this.map[id]( [ x, y, width, height ]);
        return this;
    }

    get (id){
        return this.map[id];
    }

    async load(){
        return new Promise((resolve, reject)=>{     //Promise используется для ассинхронных вычислений, в данном случае для загрузки отображения. resolve - при успешном выполнении, reject  при провале
            this.image.src = this.src; // Приняли и установили изображение
            this.image.addEventListener('load', ()=> resolve(this)); //вешаем обработчик на событие load ,  то есть когда картинка загрузится, мы вызовем функцию resolve, которая вернет ссылку на сам(this) спрайт 
        });
    }
}