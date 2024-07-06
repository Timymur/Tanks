export const NUMBER_OF_UNITS = 13; // количество блоков 
export const TILE_SIZE = 16; // Размер одной плитки, в 4 раза меньше чем unit size
export const UNIT_SIZE = 32; // Размер блока
export const STAGE_SIZE = NUMBER_OF_UNITS * UNIT_SIZE

export const Keys = { // константы с нажатиями клавиш
    UP: "ArrowUp",
    RIGHT:"ArrowRight",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    SPACE: "Space"
};

export const Direction = { // константы с направлениями
    UP: 0,
    RIGHT:1,
    DOWN: 2,
    LEFT: 3
};

export const TerrainType = { // константы с видами местности
    BASE: 0, 
    BRICK_WALL: 1,
    STEEL_WALL: 2,
    TREE: 3,// Не реализован
    WATER: 4,// Не реализован
    ICE: 5// Не реализован
};

export const BASE_POSITION = [6 * UNIT_SIZE, 12 * UNIT_SIZE]; // Позиция базы
export const BASE_WIDTH = UNIT_SIZE; // Размеры базы
export const BASE_HEIGHT = UNIT_SIZE;
export const BASE_SPRITES = [ // Спрайты базы
    [19 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // орел, действующий спрайт
    [20 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE] // сгоревший флаг, после gameover
];

export const TANK_WIDTH = UNIT_SIZE;// размер танка
export const TANK_HEIGHT = UNIT_SIZE;
export const TANK_SPEED = 0.5; // скорость танка
export const TANK_TURN_THRESHOLD = 8; // дрифт . Максимально количество пикселей при смещении на повороте.
export const TANK_ANIMATION_FRAME = 20; // ???


export const TANK_EXPLOSION_WIDTH = UNIT_SIZE ;// Размер взрыва танка 
export const TANK_EXPLOSION_HEIGHT = UNIT_SIZE ;
export const TANK_EXPLOSION_SPEED = 4; // Скорость взырва
export const TANK_EXPLOSION_SPRITES = [// спрайты взрыва
    [16 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [17 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [18 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [19 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE * 2, UNIT_SIZE * 2],
    [21 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE * 2, UNIT_SIZE * 2]
];

export const BULLET_WIDTH = 8; // Размер пули
export const BULLET_HEIGHT = 8;
export const BULLET_SPEED = 1.5;// Скорость пули
export const BULLET_SPRITES = [// Спрайты пули в зависимоти от направления танка
    [20 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, BULLET_WIDTH, BULLET_HEIGHT], // Вверх
    [21.5 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, BULLET_WIDTH, BULLET_HEIGHT],// вправо
    [21 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, BULLET_WIDTH, BULLET_HEIGHT],// вниз 
    [20.5 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, BULLET_WIDTH, BULLET_HEIGHT]// влево
];

export const BULLET_EXPLOSION_WIDTH = UNIT_SIZE; // размер взрыва пули 
export const BULLET_EXPLOSION_HEIGHT = UNIT_SIZE;
export const BULLET_EXPLOSION_SPEED = 1.5;// скорость взрыва пули 
export const BULLET_EXPLOSION_SPRITES = [// спрайты
    [16 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [17 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [18 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
];

export const PLAYER1_TANK_POSITION = [4 * UNIT_SIZE, 12 * UNIT_SIZE];// начальная  позиция игрового танка 
export const PLAYER1_TANK_SPRITES = [ // спрайты
    [0 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // вверх 1
    [1 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// вверх 2
    [6 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // вправо 1
    [7 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// вправо 2
    [4 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],//Вниз 1
    [5 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],//Вниз 2
    [2 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// влево 1
    [3 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]    // влево 2 
];

export const ENEMY_TANK_START_POSITIONS = [ // Начальная позиция танков противников 
    [6 * UNIT_SIZE, 0], // посередине
    [0 * UNIT_SIZE, 0],// слева
    [12 * UNIT_SIZE, 0],// справа
];

export const ENEMY_TANK_TURN_TIMER_THRESHOLD = 200; // частота с которой танки противников меняют направление, упершись в препятствие
export const ENEMY_TANK_SPRITES = [// спрайты танков противников
    [   
        [8 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// вверх 1
        [9 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// вверх 2
        [14 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// вправо 1
        [15 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// вправо 2
        [12 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],//Вниз 1
        [13 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],//Вниз 2
        [10 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],// влево 1
        [11 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]// влево 2

    ]
    
];

export const BRICK_WALL_SPRITES = [
        [UNIT_SIZE*16, 4*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Целая кирпичная стена
        [UNIT_SIZE*16.5, 4*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Кирпич справа
        [UNIT_SIZE*17, 4*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Кирпич снизу
        [UNIT_SIZE*17.5, 4*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Кирпич слева
        [UNIT_SIZE*18, 4*UNIT_SIZE, TILE_SIZE, TILE_SIZE]// Кирпич сверху
    ];

export const STEEL_WALL_SPRITES=[
    [UNIT_SIZE*16, 4.5*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Целая стальная стена
    [UNIT_SIZE*17, 4.5*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Кирпич справа
    [UNIT_SIZE*18, 4.5*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Кирпич снизу
    [UNIT_SIZE*19, 4.5*UNIT_SIZE, TILE_SIZE, TILE_SIZE],// Кирпич слева
    [UNIT_SIZE*20, 4.5*UNIT_SIZE, TILE_SIZE, TILE_SIZE]
    ];

export const NUMBER_SPRITES = [
    [20.5 *UNIT_SIZE, 11.5 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //0
    [21 *UNIT_SIZE, 11.5 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 1
    [21.5 *UNIT_SIZE, 11.5 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //2
    [22 *UNIT_SIZE, 11.5 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //3
    [22.5 *UNIT_SIZE, 11.5 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //4
    [20.5 *UNIT_SIZE, 12 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //5
    [21 *UNIT_SIZE, 12 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //6
    [21.5 *UNIT_SIZE, 12 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //7
    [22 *UNIT_SIZE, 12 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //8
    [22.5 *UNIT_SIZE, 12 *UNIT_SIZE, TILE_SIZE, TILE_SIZE], //9
];

export const GAMEOVER = [18 *UNIT_SIZE, 11.5 *UNIT_SIZE, 2* UNIT_SIZE, UNIT_SIZE]; // спрайт gameover