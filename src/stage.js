import * as constans from './constans.js';
import Wall from './wall.js';

export default class Stage {
    static createObject(args) {
        switch (args.type) {
            case constans.ObjectType.BRICK_WALL: return new Wall({
                ...args,
                sprites: constans.BRICK_WALL_SPRITES
            });
            

            case constans.ObjectType.STEEL_WALL: return new Wall({
                ...args,
                sprites: constans.STEEL_WALL_SPRITES
            });
        }
        
    }

    constructor(data) {
        this.debug = true;
       
        this.objects = data.map.map((values, y) => {
            return values.map((value, x) => {
                return value && Stage.createObject({
                    type: value,
                    x: x * constans.TILE_SIZE,
                    y: y * constans.TILE_SIZE,
                    width: constans.TILE_SIZE,
                    height: constans.TILE_SIZE
                });
            });
        }).reduce((objects, array) => objects.concat(...array.filter(v => !!v)), []);
        
    }
}