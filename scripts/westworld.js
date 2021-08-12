// ----------------------------------------------------------------------------------
// WESTWORLD.js
//
// Working page: 
// https://www.notion.so/Westworld-js-227c09923c2b45a28fdeeb4655e29236
// https://github.com/TheoLvs/westworld

// References:
// https://github.com/kittykatattack/learningPixi
// Pixi documentation https://pixijs.download/dev/docs/PIXI.Ticker.html#maxFPS
// 
// Requirements: 
// - Pixi.js
// ----------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------
// Constants and utils
// ----------------------------------------------------------------------------------


const RED = 0xff0000
const GREEN = 0x00ff00
const BLUE = 0x0000ff
const WHITE = 0xffffff
const GRAY = 0x808080
const YELLOW = 0xffff00
const BLACK = 0x000000


var RandomId = function () {
    // Drawn from https://gist.github.com/gordonbrander/2230317
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };


// ----------------------------------------------------------------------------------
// Shapes and simple graphics
// ----------------------------------------------------------------------------------


const makeRectangleGraphics = (top,left,width,height,color) => {
    const shape = new PIXI.Graphics();
    shape.beginFill(color);
    shape.drawRect(top,left,height,width);
    shape.endFill();
    return shape;
    
} 

const makeRectangleSprite = (top,left,width,height,color) => {
    const shape = new PIXI.Sprite(PIXI.Texture.WHITE);
    shape.position.set(top,left);
    shape.width = width;
    shape.height = height;
    shape.tint = color;
    return shape
}



const makeLine = (x1,y1,x2,y2,container,color = 0x888888,width = 1,alpha = 1) => {
    const shape = new PIXI.Graphics();

    shape.lineStyle(width,color,alpha); // width,color,alpha

    // Draw Line
    shape.moveTo(x1,y1);
    shape.lineTo(x2,y2);
    container.addChild(shape);
}


const makeGrid = (width,height,cellSize,container,color = 0x888888) => {

    for (var i = 0 ; i < width ; i ++ ){
        makeLine(i*cellSize,0,i*cellSize,1000,container,color)
    }

    for (var j = 0 ; j < height ; j ++ ){
        makeLine(0,j*cellSize,1000,j*cellSize,container,color)
    }

}



// ----------------------------------------------------------------------------------
// ENVIRONMENT
// ----------------------------------------------------------------------------------


class GridEnvironment  {
    constructor({width = 40,height = 30,cellSize = 20,objects=null,backgroundColor=0x061639,showGrid=true,gridColor=0x888888,...params}){

        // Important attributes
        this.width = width
        this.height = height
        this.cellSize = cellSize
        this._objects = {}

        // Maybe better to use a container instead of directly the application
        this.app = new PIXI.Application({ 
            width:width * cellSize,
            height:height * cellSize,
            ...params,
        });
        this.app.renderer.backgroundColor = backgroundColor;

        // Create wrapper for container
        this.container = this.app.stage

        // Create canvas
        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(this.app.view);

        // Add and initialize objects
        this.add(objects)

        // Display grid
        if (showGrid){
            makeGrid(width,height,cellSize,this.container,gridColor)
        }


        let type = "WebGL"
        if(!PIXI.utils.isWebGLSupported()){
            type = "canvas"
        }

        PIXI.utils.sayHello(type)

    }


    get objects(){
        return Object.values(this._objects)
    }


    add(obj){
        if (obj !== null){
            if (Array.isArray(obj)){
                obj.forEach(el => {
                    this.add(el)
                });
            } else {
                obj.bind(this)
                this._objects[obj.id] = obj
            }
        }

    }
    step(){
        this.objects.forEach(obj => {

            if (!obj.isStationary){
                obj.step()
            }
        })
    }

    // render(){
    //     this.objects.forEach(obj => {
    //         obj.render()
    //     })
    // }
}


// ----------------------------------------------------------------------------------
// AGENTS
// ----------------------------------------------------------------------------------


class BaseAgent{
    constructor(x,y,color = RED){

        // Id creation
        this.id = RandomId();

        // Other attributes
        this.x = x
        this.y = y
        this.color = color
    }

    bind(env){
        this._env = env
        this.shape = makeRectangleSprite(this.top,this.left,this.cellSize,this.cellSize,this.color)
        this.env.container.addChild(this.shape)
    }

    get isStationary(){
        return false
    }


    get env(){
        return this._env
    }

    get cellSize(){
        return this._env.cellSize
    }

    get pos(){
        return [this.x,this.y]
    }

    get top(){
        return this.x * this.cellSize
    }

    get left(){
        return this.y * this.cellSize
    }

    move(dx,dy){

        // Update internal position in the grid
        this.x += dx
        this.y += dy

        // Update sprite position for auto rendering
        this.shape.x = this.top
        this.shape.y = this.left

    }

    step(){
        console.log("Step function for agent ",this.id)
    }

    // Probably not need anymore render functions
    // render(){
    //     // this.renderRect()
    // }

    // renderRect(){
    //     makeRectangle(this.top,this.left,this.cellSize,this.cellSize,this.color,this._env.container)
    // }

}


// ----------------------------------------------------------------------------------
// OBJECTS
// ----------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------
// SIMULATION
// ----------------------------------------------------------------------------------


class Simulation{
    constructor(env,fps = 10){
        this.env = env

        // Set up FPS (Frame Per Seconds for simulation)
        // Maybe more useful in run fonction
        this.fps = fps
        env.app.ticker.minFPS = this.fps
        env.app.ticker.maxFPS = this.fps

    }


    step(){
        this.env.step();
    }


    run(n = null){

        let i = 0;
        
        this.env.app.ticker.add(delta => {

            if (n !== null){
                if (i == n){
                    this.env.app.ticker.stop();
                }
            }

            i++
            return this.step()
        });


    }





}