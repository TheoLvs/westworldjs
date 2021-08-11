

// ----------------------------------------------------------------------------------
// Shapes and simple graphics
// ----------------------------------------------------------------------------------


const makeRectangle = (top,left,width,height,color,container) => {

    const shape = new PIXI.Graphics();
    shape.beginFill(color);
    shape.drawRect(top,left,top+height,left+width);
    shape.endFill();
    container.addChild(shape);
    
} 


const makeLine = (x1,y1,x2,y2,container,color = 0x888888,width = 1,alpha = 1) => {
    const shape = new PIXI.Graphics();

    shape.lineStyle(width,color,alpha); // width,color,alpha

    // Draw Line
    shape.moveTo(x1,y1);
    shape.lineTo(x2,y2);
    container.addChild(shape);
}


const makeGrid = (width,height,cellWidth,container,color = 0x888888) => {

    for (var i = 0 ; i < width ; i ++ ){
        makeLine(i*cellWidth,0,i*cellWidth,1000,container,color)
    }

    for (var j = 0 ; j < height ; j ++ ){
        makeLine(0,j*cellWidth,1000,j*cellWidth,container,color)
    }

}