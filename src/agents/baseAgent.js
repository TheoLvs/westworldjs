import * as PIXI from "pixi.js";
import * as utils from "../utils";
import {BaseObject} from "../objects/baseObject";

export class BaseAgent extends BaseObject{
    constructor(x,y,color = utils.RED,blocking=true){
        super(x,y,color);
        this._blocking = blocking
    }

    get isBlocking(){
        return this._blocking
    }


    step(){
        // console.log("Step function for agent ",this.id)
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
        let [dx,dy] = utils.randomChoice(utils.MOVES);
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
