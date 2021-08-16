
import * as PIXI from "pixi.js"

// ----------------------------------------------------------------------------------
// Constants and utils
// ----------------------------------------------------------------------------------


export const RED = 0xff0000
export const GREEN = 0x00ff00
export const BLUE = 0x0000ff
export const WHITE = 0xffffff
export const GRAY = 0x808080
export const YELLOW = 0xffff00
export const BLACK = 0x000000



export const MOVES = [
    [1,0],
    [-1,0],
    [0,1],
    [0,-1],
]

export let MOVESDIAGONAL = MOVES + [
    [1,1],
    [1,-1],
    [-1,1],
    [-1,-1]
]


export var randomId = () => {
    // Drawn from https://gist.github.com/gordonbrander/2230317
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

export var randomChoice = (choices) => {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

export var randomInt = (min,max) => {
    // Random Integer between min and max - 1
    return Math.floor(Math.random() * (max - min) + min);
}


export function intersectsBoxBox(x1, y1, w1, h1, x2, y2, w2, h2)
// From https://github.com/davidfig/intersects/blob/master/box-box.js
{
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}


// ----------------------------------------------------------------------------------
// Shapes and simple graphics
// ----------------------------------------------------------------------------------


export const makeRectangleGraphics = (top,left,width,height,color) => {
    const shape = new PIXI.Graphics();
    shape.beginFill(color);
    shape.drawRect(top,left,height,width);
    shape.endFill();
    return shape;
    
} 

export const makeRectangleSprite = (top,left,width,height,color) => {
    const shape = new PIXI.Sprite(PIXI.Texture.WHITE);
    shape.position.set(top,left);
    shape.width = width;
    shape.height = height;
    shape.tint = color;
    return shape
}



export const makeLine = (x1,y1,x2,y2,container,color = 0x888888,width = 1,alpha = 1) => {
    const shape = new PIXI.Graphics();

    shape.lineStyle(width,color,alpha); // width,color,alpha

    // Draw Line
    shape.moveTo(x1,y1);
    shape.lineTo(x2,y2);
    container.addChild(shape);
}


export const makeGrid = (width,height,cellSize,container,color = 0x888888) => {

    for (var i = 0 ; i < width ; i ++ ){
        makeLine(i*cellSize,0,i*cellSize,1000,container,color)
    }

    for (var j = 0 ; j < height ; j ++ ){
        makeLine(0,j*cellSize,1000,j*cellSize,container,color)
    }

}

