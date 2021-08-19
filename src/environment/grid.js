import * as PIXI from "pixi.js";
import * as utils from "../utils";

// ----------------------------------------------------------------------------------
// ENVIRONMENT
// ----------------------------------------------------------------------------------


export class GridEnvironment  {
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
            utils.makeGrid(width,height,cellSize,this.container,gridColor)
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

    getOccupiedPositions(){
        let positions = [];
        this.objects.forEach(el => {
            if (el.isBlocking){
                positions.push(el.pos)
            }
        })
        return positions;
    }


    _makeZeroMatrix(i,j){
        // https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
        return Array(i).fill().map(() => Array(j).fill(0));
    }

    getNavigationMesh(){
        let mesh = this._makeZeroMatrix(this.width,this.height);
        let positions = this.getOccupiedPositions();
        positions.forEach(pos => {
            let [x,y] = pos;
            mesh[x][y] = 1
        })
        return mesh;
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
        let x = utils.randomInt(0,this.width);
        let y = utils.randomInt(0,this.height);
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
