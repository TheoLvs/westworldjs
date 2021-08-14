



let env = new GridEnvironment({
    width:100,
    height:40,
    cellSize:10,
    toroidal:true,
    showGrid:false,
});

class Agent extends BaseAgent{
    step(){
        this.moveTowards(0,0)
        // this.randomWalk()
    }
}


let spawner = (x,y) => {
    return new Agent(x,y);
}

env.spawn(spawner,10)


// let agent = new Agent(0,0);
// let agent2 = new Agent(10,2);
// env.add([agent])


let sim = new Simulation(env,10);

sim.run();

// let FPS = 10
// env.app.ticker.minFPS = FPS
// env.app.ticker.maxFPS = FPS

// let i = 0;

// function gameLoop(delta){



//     agent.move(1,0)
//     agent2.move(0,1)


//     console.log(i,delta)
//     i++

//     // Move the cat 1 pixel 
//     // cat.x += 1;
// }


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


