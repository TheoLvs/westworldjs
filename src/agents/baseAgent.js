import * as PIXI from "pixi.js";
import * as utils from "../utils";

export class BaseAgent{
    constructor(x,y,color = utils.RED){

        // Id creation
        this.id = utils.randomId();

        // Other attributes
        this.x = x
        this.y = y
        this.color = color
    }

    bind(env){
        this._env = env
        this.shape = utils.makeRectangleSprite(this.top,this.left,this.cellSize,this.cellSize,this.color)
        this.env.container.addChild(this.shape)
    }

    setColor(color){
        this.shape.tint = color;
    }

    collidesRectRect(other){
        // Inspired by Intersects
        // https://github.com/davidfig/intersects/blob/master/box-box.js

        let b1 = this.shape.getBounds();
        let b2 = other.shape.getBounds();

        let [x1,y1,w1,h1] = [b1["x"],b1["y"],b1["width"],b1["height"]]
        let [x2,y2,w2,h2] = [b2["x"],b2["y"],b2["width"],b2["height"]]

        return utils.intersectsBoxBox(x1,y1,w1,h1,x2,y2,w2,h2);

    }

    collidesRect(others){
        let collisions = [];
        others.forEach(other => {
            if (this.id !== other.id){
                if (this.collidesRectRect(other)){
                    collisions.push(other.id)
                }
            }
        })
        let isCollision = collisions.length > 0;
        return [isCollision,collisions]
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
        let [dx,dy] = utils.randomChoice(MOVES);
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
                let [dx,dy] = utils.randomChoice(moves);
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
