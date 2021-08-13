



let env = new GridEnvironment({
    width:40,
    height:20,
    cellSize:20,
    toroidal:true,
});

class Agent extends BaseAgent{
    step(){
        this.randomWalk()
    }
}

let agent = new Agent(0,0);
// let agent2 = new Agent(10,2);

env.add([agent])


let sim = new Simulation(env,10);

sim.run(50);

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


