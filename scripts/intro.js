



let env = new GridEnvironment({
    width:40,
    height:20,
    objects:null,
    cellSize:20,
});

let agent = new BaseAgent(0,0);
let agent2 = new BaseAgent(10,2);

env.add([agent,agent2])

env.render();

