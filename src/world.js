import Tank from "./tank.js";
import {CELL_SIZE, Direction} from "./constans.js";

export default class World{ // Мир
    level = null; // Устанавливается setLevel
    player1Tank = new Tank();
    player2Tank = null;
    enemyTanks = [];

    
    setLevel(data){
            this.level = data.map((blocks,y)=>{// map создает новый массив, перебирая каждый элемент в передаваемую функцию.
                return blocks.map((block, x) => {// вызываем мар еще раз чтобы провалиться в массив и перебрать уже его элементы
                    return{  // получается, что мы для каждого элемента двумерного массива level, который хранится в levels, устанавливаем координаты, ширину, высоту и спрайт.
                        x: x *CELL_SIZE,
                        y: y *CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        sprite: block
                    };
                });
            });
    }
    

    

    update(activeKeys){ // Обновление мира, принимает нажатую клавишу
       
        this.player1Tank.update(this, activeKeys); // функция в tank.js

    }
// Коллизия
    canMove(object){ // возможность движения. принимает танк с координатами. Возвращает true, если нет препятствий
        
        const{direction, speed, x, y} = object; //Вытаскиваем поля
      
        if (direction === Direction.UP){ // Если направление танка вверх, то проверяем У
            const nextY = y - speed; // следующая возможная координата
            const objectOnPath = this.getObjectOnY(object, nextY);// Получение объекта на пути . передаем танк и следующую координату, куда хотим встать
            return !objectOnPath && nextY > 0; // Если нет объекта на пути и мы не у границы, то можем двигаться. Возвращаем true
        }
        else 
        if(direction === Direction.RIGHT){
            const nextX = x + speed;
            const objectOnPath = this.getObjectOnX(object, nextX);
            return !objectOnPath && ((nextX+ CELL_SIZE) < canvas.width );
        }
        else 
        if(direction === Direction.DOWN){
            const nextY = y + speed;
            const objectOnPath = this.getObjectOnY(object, nextY);
            return !objectOnPath && ((nextY+ CELL_SIZE) < canvas.height );     
        }
        else 
        if(direction === Direction.LEFT){
            const nextX = x  - speed;
            const objectOnPath = this.getObjectOnX(object, nextX);
            return !objectOnPath && nextX > 0;   
        }

    }

    getObjectOnX(object, nextX){ // Получение объекта на пути по оси х

        //result предыдущее значение, полученное с предыдущей итерации. blocks следующее значение. первое значение [] - пустой массив
        // ... оператор, который вытаскивает значения из массива. Пример:
                        //f(a,b,c) - принимает три параметра. 
                        // arr [a,b,c] - массив из 3 элементов.
                        //Чтобы передать все элементы не указывая индекс каждого f(arr[0], arr[1], arr[2])
                        // Можно использовать оператор ...
                        // f(...arr)
        // concat  возвращает объединенный массив. то есть к имеющемуся массиву добавляет элементы из передаваемого массива
        // Мы перебираем массив level (result = i, blocks = i+1), и к каждому элементу result добавляем "раскрытые" элементы blocks, постепенно собирая конечный массив
       // То есть у нас получился массив с элементами, хранящими данные о каждом объекте x, y, widht, height, в которые мы можем врезаться
       //После этого, мы ищем в этом массиве find() блок, в который мы можем врезаться.
       //Ищем блок, у которого спрайт > 0, так как это пустое место и по нему мы можем передвигаться
       // и используем еще условия, которые описаны ниже
       // block -  каждый элемент, через него мы подбираемся к полям и производим проверку
       return this.level                    //Reduce перебирает элементы массива, выполняя определенные операции    
               .reduce((result, blocks) =>  //result  принимает значение предыдущей итерации
                result.concat(...blocks), []) //concat  возвращает объединенный массив
                .find(block => 
                    block.sprite >0 &&
                (
                    // Данные функции описаны внизу
                    isSame(object.y, block.y )|| // Если координаты танка и блока совпадают
                    isBetween(object.y, block.y, block.y+ block.height)|| // Если верхняя граница танка находится между верхней и нижней границами блока
                    isBetween(object.y + 26, block.y, block.y+ block.height)// Если нижняя граница танка находится между верхней и нижней границами блока
 
                    //Проверка столкновения с болоком по у
                 
                ) &&
                (
                    isSame( nextX, block.x) ||
                    isBetween(nextX, block.x, block.x+ block.width)  ||// проверка. правая координата танка между левым и правым границами блока
                    isBetween(nextX + 26, block.x, block.x+ block.width)// проверка. левая координата танка между левым и правым границами блока
                     //Проверка столкновения с болоком по х   
                )
                );            
    }

    getObjectOnY(object, nextY){  // Аналогичный метод только при движении по оси у

        return this.level
                .reduce((result, blocks) => 
                result.concat(...blocks), [])
                .find(block => 
                    block.sprite >0 &&
                (
                    isSame(nextY, block.y )||
                    isBetween(nextY, block.y, block.y+ block.height)||
                    isBetween(nextY + 26, block.y, block.y+ block.height)
                    //Проверка столкновения с болоком по у
                 
                ) &&
                (
                    isSame( object.x, block.x) ||
                    isBetween(object.x, block.x, block.x+ block.width)  ||// проверка. правая координата танка между левым и правым границами блока
                    isBetween(object.x + 26, block.x, block.x+ block.width)// проверка. левая координата танка между левым и правым границами блока
                     //Проверка столкновения с болоком по х
                    
                )
                );
    }
}

function isBetween(p, p1, p2 ){ //Функция проверки. Находится ли р между р1 и р2
    return p > p1 & p <p2 ;
}

function isSame(p1, p2){ 
    return p1 === p2
}