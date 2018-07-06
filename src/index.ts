import Polygons from "./data/dataPolygons"
import CanvasState from "./classes/canvasState";



function init() {
    var canvas: any = document.getElementById('canvas');

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth - 80;
        canvas.height = window.innerHeight - 80;
        drawStuff();
    };

    resizeCanvas();

    function drawStuff(){
        var state: any = new CanvasState(canvas, Polygons);
    }
}

init();