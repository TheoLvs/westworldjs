



//Create a Pixi Application
let app = new PIXI.Application({ 
    width: 700,         // default: 800
    height: 400,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
}
);

app.renderer.backgroundColor = 0x061639;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

PIXI.utils.sayHello(type)

makeGrid(10,10,50,app.stage)

makeRectangle(50,50,100,100,0x00add0,app.stage)

// const line = new PIXI.Graphics();

// line.lineStyle(1, 0x888888, 1); // width,color,alpha

// // Draw Line
// line.moveTo(0,0);
// line.lineTo(100,100);
// app.stage.addChild(line);

