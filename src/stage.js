import { STAGE_SIZE, TILE_SIZE, TerrainType } from './constants.js';
import EventEmitter from "./event-emitter.js";
import Base from './base.js';
import BrickWall from './brick-wall.js';
import SteelWall from './steel-wall.js';
import PlayerTank from './player-tank.js';
import EnemyTank from './enemy-tank.js';

export default class Stage extends EventEmitter { // класс уровень, наследуется от создателя событий
    



    constructor(data) {
        super(); //Вызов конструктора предка
        this.base = new Base(); // Создание базы
        this.playerTank = new PlayerTank(); // Создание игрового танка
        this.enemyTanks = this.createEnemies(data.enemies); // Создание Врагов
        this.terrain = this.createTerrain(data.map);// создание объектов местности
        this.enemyTankCount = 0; // Считчик количества танков противников
        this.enemyTankTimer = 0; // время появления танков противников
        this.enemyTankPositionIndex = 0; // Индекс появления танков противнников ( их расположение 0 - посередине, 1- слева, 2- справа. В файле constants массив)

        
        this.objects = new Set([ // объекты игрового мира, все что находится на уровне, записывается в эту коллекцию
            this.base,
            this.playerTank,
            ...this.terrain
        ]);

        this.init();
        
    }

    init() {
        this.base.on('destroyed', () => { // устанавливаем на базу союытие "destroyed", При исполнении вызывается gameover у stage. далее класс game
            this.emit('gameOver');
        });

        this.playerTank.on('fire', bullet => { // На игровой танк вешаем fire , функция добавляет пулю в objects
            this.objects.add(bullet);

            bullet.on('explode', explosion => { // на пулю вешаем взрыв, При исполнении добавляем взрыв 
                this.objects.add(explosion);

                explosion.on('destroyed', () => { // на взрыв вешаем дестроейт, удаляем взрыв из objects
                    this.objects.delete(explosion);
                });
            });

            bullet.on('destroyed', () => { // на пулю вешаем дестроейт, удаляем пулю из objects
                this.objects.delete(bullet);
                
            });
        });

        this.playerTank.on('destroyed', tank => { // На игровой танк вешаем дестройет , удаляет танк, и исполняет gameover
            this.objects.delete(tank);
            this.emit('gameOver');

        });

        this.enemyTanks.map(enemyTank => { // на каждый вражеский танк вешаем событие fire, 
            enemyTank.on('fire', bullet => {
                this.objects.add(bullet);  // которое добавляет пулю, при исполнии

                bullet.on('explode', explosion => { // на пулю вешаем взрыв
                    this.objects.add(explosion);

                    explosion.on('destroyed', () => { // на взрыв дестроейт
                        this.objects.delete(explosion);
                    });
                });

                bullet.on('destroyed', () => { // на пулю вешаем дестроейт, удаляем пулю из objects
                    this.objects.delete(bullet);
                });
            });

            enemyTank.on('explode', explosion => { // Взрыв на вражеский танк
                this.objects.add(explosion);

                explosion.on('destroyed', () => {// дестроет на взрыв
                    this.objects.delete(explosion);
                });
            });

            enemyTank.on('destroyed', () => this.removeEnemyTank(enemyTank));// дестройет на враг танк, удаляет из object
        });

    }
    get width() {
        return STAGE_SIZE;
    }

    get height() {
        return STAGE_SIZE;
    }

    get top() {
        return 0;
    }

    get right() {
        return this.width;
    }

    get bottom() {
        return this.height;
    }

    get left() {
        return 0;
    }

    
    update(input,frameDelta ) { // принимаем кнопку и разницу во времени
        const state = { // записываем кнопку , разницу и уровень
            input,
            frameDelta,
            stage: this
        };
        if(this.shouldAddEnemyTank(frameDelta)){ // Проверка на добавление вражеского танка
            this.addEnemyTank(); // добавление враг танка
        }

        this.objects.forEach(object => object.update(state)); // для каждого объекта, который находится на уровне, вызываем метод update и передаем ему данные
    }

    createObject(type, args) { // Создает объект местности в зависимости от типа.
        switch (type) {
            case TerrainType.BRICK_WALL: return new BrickWall(args);// кирпич стена
            case TerrainType.STEEL_WALL: return new SteelWall(args);// железная стена
        }
    }

     createTerrain(map) { // Создает массив объектов местности
        const objects = [];

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map.length; j++) {
                const value = map[j][i]; // Записываем в value значение хранящееся по определенному индексу.

                if (value) { // Если есть значение то передаем в createObject тип(само значение) и координаты
                    const object = this.createObject(value, { 
                        x: i * TILE_SIZE,
                        y: j * TILE_SIZE
                    });

                    objects.push(object); // Добавляем в массив с объектами уровня
                }
            }
        }

        return objects;
    }

     createEnemies(types) {// создаем врагов в зависимости от типа танка(реализован только один тип)
        return types.map(type => new EnemyTank({ type }));
    }


    isOutOfBounds(object) { // проверка на выход за границы игрового поля
        return (
            object.top < this.top ||
            object.right > this.right ||
            object.bottom > this.bottom ||
            object.left < this.left
        );
    }

    hasCollision(object) {// проверка на коллизию
        const collision = this.getCollision(object);

        return Boolean(collision);
    }

    getCollision(object) { // получение факта коллизии 
        const collisionObjects = this.getCollisionObjects(object);

        if (collisionObjects.size > 0) {
            return { objects: collisionObjects };
        }
    }

    getCollisionObjects(object) { //получение объекта коллизии
        const objects = new Set();

        for (const other of this.objects) { // проходим по всем объектам и проверяем нет ли коллизии с действующим объектом
            if (other !== object && this.haveCollision(object, other)) {
                objects.add(other);
            }
        }

        return objects;
    }

    haveCollision(a, b) { // получение коллизии между двумя объектами
        return (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
        );
    }
    shouldAddEnemyTank(frameDelta){ // установка добавления танков врагов
        this.enemyTankTimer += frameDelta;

        return this.enemyTankTimer > 1000 && this.enemyTankCount <3  ; // если танков меньше трех и если прошла секунда с момента появления предыдущего танка

    }
    
    addEnemyTank(){
        const tank = this.enemyTanks.shift(); // метод удаляет первый элемент массива и возвращает его значение, при этом сокращается длина массива
        if(tank){
            tank.setPosition(this.enemyTankPositionIndex); // установка начальной позиции танка
        
            this.enemyTankCount +=1; // инкремент счетчика числа танков
            this.enemyTankTimer = 0; // обнуление таймера появления
            this.enemyTankPositionIndex = (this.enemyTankPositionIndex+1) %3; // эта конструкция позволяет зациклить инкрементирование от 0 до 2
            this.objects.add(tank);// Добавляем враг танк
        }
    }

    removeEnemyTank(enemyTank){ // удаление враг танка 
        this.objects.delete(enemyTank);
        this.enemyTankCount-=1; // декремент счетчика 
    }
}
