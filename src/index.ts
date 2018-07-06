import { Polygon } from "./classes/polygon";
import { CanvasState } from "./classes/canvasState";

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
        var s: object = new CanvasState(canvas);
        if( polygonsInit.length ){
            for ( var i = 0; i < polygonsInit.length; i++ ) {
                s.addPolygon(new Polygon( polygonsInit[i].way, polygonsInit[i].fill, i ));
            }
        }
    }
}

const polygonsInit: any = [
    {
        way: [
            [10,10],
            [100,50],
            [40,110]
        ],
        fill: 'orange'
    },
    {
        way: [
            [10,130],
            [100,150],
            [120,180],
            [60,200],
            [20,180]
        ],
        fill: 'black'
    },
    {
        way: [
            [10,230],
            [100,200],
            [140,300],
            [80,250],
            [40,300]
        ],
        fill: 'green'
    }
];

init( polygonsInit );
////////////////////////////////////////////////
/// алгоритм проверки пересечения двух линий ///
////////////////////////////////////////////////
function crossLine( l1:Array<number>, l2:Array<number> ): boolean {

    let dx1:number = l1[1][0] - l1[0][0],
        dy1:number = l1[1][1] - l1[0][1],
        dx2:number = l2[1][0] - l2[0][0],
        dy2:number = l2[1][1] - l2[0][1],
        x:number = dy1 * dx2 - dy2 * dx1;

    if( !x || !dx2 || !dx1|| !dy1|| !dy2) {
        return false;
    }

    let y: number = l2[0][0] * l2[1][1] - l2[0][1] * l2[1][0];
    x = ((l1[0][0] * l1[1][1] - l1[0][1] * l1[1][0]) * dx2 - y * dx1) / x;
    y = (dy2 * x - y) / dx2;

    return ((l1[0][0] <= x && l1[1][0] >= x) || (l1[1][0] <= x && l1[0][0] >= x)) && ((l2[0][0] <= x && l2[1][0] >= x) || (l2[1][0] <= x && l2[0][0] >= x));
}

////////////////////////////////////////////
/// проверка пересечения линий полигонов ///
////////////////////////////////////////////
function crossElem( elem: any, allElems: Array<any> ) {
    for (  var i = 0; i < allElems.length; i++ ) {
        if ( allElems[i].id == elem.id ) {
            continue;
        } else {
            for ( var j = 0; j < allElems[i].way.length; j++ ) {
                for ( var k = 0; k < elem.way.length; k++ ) {
                    var lk = k+1;
                    var lj = j+1;
                    if( lk >= elem.way.length  ) { lk = 0 }
                    if( lj >= allElems[i].way.length  ) { lj = 0 }
                    var l1 = [elem.way[ k ], elem.way[ lk ]];
                    var l2 = [allElems[ i ].way[ j ], allElems[ i ].way[ lj] ];

                    if( crossLine( l1, l2 ) ){
                        allElems[ i ].color = 'red';
                        allElems[ elem.id ].color = 'red';
                        return {
                            resp: true,
                            indexCross: i
                        };
                        break;
                    }
                }
            }
        }
    }
    return {
        resp: false,
        indexCross: null
    };
}