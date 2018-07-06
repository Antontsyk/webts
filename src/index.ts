import { Polygon } from "./classes/polygon";
import { CanvasState } from "./classes/canvasState";
import { polygonsInit } from "./data/dataPolygons";

let paths: Array<object> = [];



function init(polygonsInit:Array<object>) {
    var canvas: any = document.getElementById('canvas');

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth - 80;
        canvas.height = window.innerHeight - 80;
        drawStuff();
    };

    resizeCanvas();

    var polygonsInit = polygonsInit;

    function drawStuff(){
        var s: any = new CanvasState(canvas);
        if( polygonsInit.length ){
            for ( var i = 0; i < polygonsInit.length; i++ ) {
                s.addPolygon(new Polygon( polygonsInit[i].way, polygonsInit[i].fill, i ));
            }
        }
    }
}

init( polygonsInit );