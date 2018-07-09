import Polygons from "./data/dataPolygons"
import CanvasState from "./classes/canvasState";

console.log(Polygons)

function init():void {
    const canvas: any = document.getElementById('canvas');

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth - 80;
        canvas.height = window.innerHeight - 80;
        drawStuff();
    };

    resizeCanvas();

    function drawStuff(){
        let state: any = new CanvasState(canvas, Polygons);
    }
}

init();