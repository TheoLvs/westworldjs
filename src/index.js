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

export * from "./utils";
export * from "./simulation";
export * from "./agents/baseAgent";
export * from "./environment/grid";


import {GridEnvironment} from "./environment/grid";
import {BaseAgent} from "./agents/baseAgent";
import {Simulation} from "./simulation";
import * as utils from "./utils";

let env = new GridEnvironment({
    width:80,
    height:40,
    cellSize:10,
    toroidal:true,
    showGrid:false,
});


class Agent extends BaseAgent{
    step(){

        // this.randomWalk()
        this.followMouse();

        let [isCollision,collisions] = this.collidesRect(this.env.objects)
        this.setColor(isCollision ? utils.BLUE : utils.GREEN);
        
        // this.moveTowards(0,0)
    }
}


let agent = new BaseAgent(10,10);
env.add([agent])


let spawner = (x,y) => {
    return new Agent(x,y);
}

env.spawn(spawner,100)


let agent2 = new Agent(10,2);


let sim = new Simulation(env,30);

sim.run();



