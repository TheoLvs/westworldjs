import * as PIXI from "pixi.js";
import * as utils from "../utils";


export class BaseObject{

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

    get isBlocking(){
        return false;
    }

    get isTrigger(){
        return false;
    }

    get isObstacle(){
        return (this.isBlocking && this.isStationary)
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


    setPosition(x,y){
        // Update internal position in the grid
        this.x = x
        this.y = y

        // Update sprite position for auto rendering
        this.shape.x = this.top
        this.shape.y = this.left
    }


}