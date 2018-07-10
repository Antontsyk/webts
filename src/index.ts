import Polygons from "./data/dataPolygons"
import CanvasState from "./classes/canvasState";

const canvas: any = document.getElementById('canvas');

function updateWindow(){
    canvas.width = window.innerWidth - 80;
    canvas.height = window.innerHeight - 80;
    let state: any = new CanvasState(canvas, Polygons);
}

updateWindow();

window.addEventListener('resize', updateWindow, false);