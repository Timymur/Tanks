export default class Input {
    constructor() {
        this.keys = new Set();// коллекция с нажатой кнопкой
        this.init();
    }

    init() {
        document.addEventListener('keydown', event => { // при нажатии добавляем в коллекцию определенную кнопку
            switch (event.code) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'Space':
                case 'Enter': // не реализован
                    
                    this.keys.add(event.code);
            }
        });

        document.addEventListener('keyup', event => { // при отпускании клавиши, удаляем кнопку из коллекции
            switch (event.code) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'Space':
                case 'Enter':
                    
                    this.keys.delete(event.code);
            }
        });
    }

    has(...arg) {
        return Array.isArray(arg) ? // если принимаемый объект является массивом
            arg.some(key => this.keys.has(key)) : // проверяем есть ли в массиве объект удовлетворяющий условию . в данном случае есть ли нажатаю кнопка в коллекции
            this.keys.has(arg); // если есть, то возвращаем ее
    }
}