export class CanvasState {
    canvas: any;
    width: number;
    height: number;
    ctx: any;

    valid:boolean = false; // when set to false, the canvas will redraw everything
    polygons: Array<object> = [];  // the collection of things to be drawn
    dragging: boolean = false; // Keep track of when we are dragging
    selection: object;
    dragoffx: number = 0;
    dragoffy: number = 0;
    startPosition: any;
    selectionColor:string = '#CC0000';
    selectionWidth:number = 2;
    paths: Array<any> = [];

    constructor( canvas: any ){
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
        const myState: any = this;
        // Up, down, and move are for dragging
        canvas.addEventListener('mousedown', function(e: Event) {
            var mouse = myState.getMouse(e);
            var mx = mouse.x;
            var my = mouse.y;
            var polygons = myState.polygons;
            var l = polygons.length;
            console.log(myState.paths)
            for( var i = 0; i < myState.paths.length; i++ ){
                var path = myState.paths[i];
                if ( myState.ctx.isPointInPath(path, mx, my)) {
                    var pol = myState.polygons[ i ];
                    var startWay = myState.polygons[i].way.copyWithin();
                    myState.dragoffx = -mx;
                    myState.dragoffy = -my;

                    myState.dragging = true;
                    myState.selection = pol;
                    myState.startPosition = new Array();

                    for( var k = 0; k < startWay.length; k++ ){
                        myState.startPosition[k] = new Array();
                        myState.startPosition[k][0] = startWay[k][0];
                        myState.startPosition[k][1] = startWay[k][1];
                    }

                    myState.valid = false;
                    break;
                    return;
                }
            }

            // havent returned means we have failed to select anything.
            // If there was an object selected, we deselect it
            if (!myState.selection) {
                myState.selection = null;
                myState.valid = false; // Need to clear the old selection border
            }
        }, true);
        canvas.addEventListener('mousemove', function(e: Event) {
            if (myState.dragging){
                var mouse = myState.getMouse(e);

                var newWay = new Array();

                for( var i = 0; i < myState.selection.way.length; i++ ){
                    newWay[i] = new Array();
                    newWay[i][0] = myState.selection.way[i][0] + myState.dragoffx + mouse.x;
                    newWay[i][1] = myState.selection.way[i][1] + myState.dragoffy + mouse.y;
                }

                if(!myState.isEnd(newWay)){
                    myState.selection.way = newWay;

                    myState.dragoffx = -mouse.x;
                    myState.dragoffy = -mouse.y;
                } else {
                    return;
                }

               /* var cross = crossElem( myState.selection, myState.polygons );

                if( cross.resp ){
                    myState.selection.fill = 'red'
                    myState.polygons[ cross.indexCross ].fill = 'red'
                    myState.returnValue = true;
                } else{
                    myState.returnValue = false;
                    myState.polygons.map( function ( elem: any, i:number ) {
                        let fill:string = polygonsInit[i].fill;
                        elem.fill = fill;
                    });
                }*/
                myState.valid = false; // Something's dragging so we must redraw
            }
        }, true);
        canvas.addEventListener('mouseup', function(e: Event) {

            if( myState.returnValue ){
                console.log( myState.startPosition )
                myState.selection.way = myState.startPosition;
                myState.returnValue = false;
                /*myState.polygons.map( function ( elem: any, i: number ) {
                    elem.fill = polygonsInit[i].fill;
                });*/
                myState.valid = false;
            };
            myState.draw();
            myState.dragging = false;
        }, false);
        window.requestAnimationFrame( myState.draw.bind(this) );
    }


    addPolygon(polygon: object) {
        this.polygons.push(polygon);
        this.valid = false;
    }

    clear () : void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    getMouse ( e:any ) :object {
        var canvas = this.canvas;
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top)
        };
    }

    draw () : void {
        if (!this.valid) {
            var ctx = this.ctx;
            var polygons = this.polygons;
            this.clear();
            ctx.globalAlpha = 1;
            // draw all polygons
            this.paths = [];
            for (let i = 0; i < polygons.length; i++) {
                this.paths.push(polygons[i].draw(ctx));
            }

            // draw selection
            // right now this is just a stroke along the edge of the selected Shape
            if (this.selection != null) {
                ctx.strokeStyle = this.selectionColor;
                ctx.lineWidth = this.selectionWidth;
            }

            // ** Add stuff you want drawn on top all the time here **

            this.valid = true;
        }
        window.requestAnimationFrame( this.draw.bind( this ) )
    }

    isEnd (newWay:Array<Array<number>>) : boolean {
        let way = newWay;
        for ( let i = 0; i < this.selection.way.length; i++ ){
            if( way[i][0] <= 0 || way[i][0] >= this.width || way[i][1] < 0 || way[i][1] > this.height ){
                return true
            }
        }
        return false;
    }
}