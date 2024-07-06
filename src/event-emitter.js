export default class EventManager { // Класс который создает, хранит и исполняет события
    // on() создает событие и функцию, исполняющуюся при совершении события
    // emit() исполняет функцию, связанную с событием
    events = new Map(); // Коллекция Map хранит события

    on(event, handler) { // Метод оп принимает событие и обработчик
        if (this.events.has(event)) {  // Проверяет есть ли это событие в коллекции
            this.events.get(event).add(handler); // Если есть, выполняет функцию обработчика к искомому событию 
        } else {
            this.events.set(event, new Set([handler])); // Если нет события, то создает его в events со значением Коллекции SET( в который передается обработчик)
        }
    }

    off(event, handler) { // Удаляет событие из events, если оно есть
        this.events.get(event)?.delete(handler);
    }

    emit(event, arg) { // Метод создает действие по определенному событию
        this.events.get(event)?.forEach(handler => handler(arg)); // Если есть событие, то вызывает обработчик, подставляя передаваемые аргументы
    }
}