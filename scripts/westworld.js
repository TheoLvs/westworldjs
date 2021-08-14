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


const MOVES = [
    [1,0],
    [-1,0],
    [0,1],
    [0,-1],
]

let MOVESDIAGONAL = MOVES + [
    [1,1],
    [1,-1],
    [-1,1],
    [-1,-1]
]


var randomId = () => {
    // Drawn from https://gist.github.com/gordonbrander/2230317
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  var randomChoice = (choices) => {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

  var randomInt = (min,max) => {
    // Random Integer between min and max - 1
    return Math.floor(Math.random() * (max - min) + min);
  }


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
    constructor({width = 40,height = 30,cellSize = 20,objects=null,backgroundColor=0x061639,showGrid=true,gridColor=0x888888,toroidal=true,...params}){

        // Important attributes
        this.width = width
        this.height = height
        this.cellSize = cellSize
        this.toroidal = toroidal
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


    getMousePosition(){
        const mouseCoords = this.app.renderer.plugins.interaction.mouse.global;
        let x = Math.max(Math.min(mouseCoords["x"],(this.width - 1) * this.cellSize),0);
        let y = Math.max(Math.min(mouseCoords["y"],(this.height - 1) * this.cellSize),0);

        // Round to cell coordinates
        // Use bitwise operator for fast integer quotient division
        x = (x / this.cellSize) >> 0
        y = (y / this.cellSize) >> 0

        return [x,y];
    }


    getRandomAvailablePosition(allowOverlap=false){
        // TODO - add overlap
        let x = randomInt(0,this.width);
        let y = randomInt(0,this.height);
        return [x,y]
    }

    spawn(spawner,n,allowOverlap=false,...rest){

        for (let i=0; i<n ; i++){
            let [x,y] = this.getRandomAvailablePosition(allowOverlap);
            let obj = spawner(x,y,...rest);
            this.add(obj);
        }

    }

    _toroidalWrap(x,y){

        let newx = x
        let newy = y


        if (this.toroidal){
            // Check with x
            if (x >= this.width){
                newx = 0;
            } else if (x < 0){
                newx = this.width - 1
            }

            // Check with y
            if (y >= this.height){
                newy = 0;
            } else if (y < 0){
                newy = this.height - 1
            }

        }

        return [newx,newy]
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
        this.id = randomId();

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

    step(){
        // console.log("Step function for agent ",this.id)
    }


    setPosition(x,y){
        // Update internal position in the grid
        this.x = x
        this.y = y

        // Update sprite position for auto rendering
        this.shape.x = this.top
        this.shape.y = this.left
    }

    move(dx,dy){
        // TODO add movements with speed and angle
        // See Python version for implementation

        // Store old position
        let [oldx,oldy] = [this.x,this.y]

        // New movements
        // TODO round x,y
        let x = this.x + dx
        let y = this.y + dy

        // Correct movements going offscreen
        // TODO use only in toroidal envs ? 
        let newPos = this.env._toroidalWrap(x,y);
        [x,y] = newPos

        // Update positions
        this.setPosition(x,y)

        // Compute collisions
        // See Python version for implementation
    }

    randomWalk(){
        let [dx,dy] = randomChoice(MOVES);
        this.move(dx,dy)
    }

    followDirection(){
    }

    wander(){
    }

    moveAt(x,y){
        let dx = x - this.x
        let dy = y - this.y
        this.move(dx,dy);
    }

    followMouse(naive=true){
        let [x,y] = this.env.getMousePosition();
        this.moveTowards(x,y,naive);
    }

    moveTowards(x,y,naive=true){

        // TODO add in naive pathfinding
        if (naive){
            let moves = [];
            if (this.x > x){
                moves.push([-1,0])
            } else if (this.x < x){
                moves.push([1,0])
            }
            if (this.y > y){
                moves.push([0,-1])
            } else if (this.y < y){
                moves.push([0,1])
            }

            if (moves.length > 0){
                let [dx,dy] = randomChoice(moves);
                this.move(dx,dy)
            }

        }
    }

    fleeFrom(){
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