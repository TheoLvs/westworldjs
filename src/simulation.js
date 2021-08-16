

// ----------------------------------------------------------------------------------
// SIMULATION
// ----------------------------------------------------------------------------------


export class Simulation{
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