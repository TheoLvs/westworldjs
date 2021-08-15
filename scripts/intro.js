



let env = new GridEnvironment({
    width:100,
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

        if (!isCollision){
            this.setColor(GREEN);
        } else {
            this.setColor(BLUE)
        }

        // this.moveTowards(0,0)
    }
}


let agent = new BaseAgent(10,10);
env.add([agent])


let spawner = (x,y) => {
    return new Agent(x,y);
}

env.spawn(spawner,100)


// let agent2 = new Agent(10,2);


let sim = new Simulation(env,30);

sim.run();












// // env.app.ticker.add(delta => {
// //     if (i < 50){
// //         return gameLoop(delta)
// //     }
// // });

// // Probably better to restart and for infinite loops
// env.app.ticker.add(delta => {
//     if (i >= 25){
//         env.app.ticker.stop();
//     }
//     return gameLoop(delta)
// });


// function gameLoop() {

//     //Call this `gameLoop` function on the next screen refresh
//     //(which happens 60 times per second)
//     requestAnimationFrame(gameLoop);
//     console.log(i)

//     i++
  
//     // //Move the cat
//     // cat.x += 1;
//   }
  
// //Start the loop
// gameLoop();


