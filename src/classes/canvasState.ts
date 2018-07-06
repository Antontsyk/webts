export default class CanvasState {
    canvas: HTMLElement;
    width: number;
    height: number;
    ctx: any;

    valid:boolean = false;
    polygons: Array<any> = [];
    selection: object;
    paths: Array<any> = [];

    constructor( canvas: any  , Polygons:Array<any> ){
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.polygons = Polygons;
        const myState: any = this;

        canvas.addEventListener('mousedown', function(e: Event) {
            var mouse = myState.getMouse(e);
            var mx = mouse.x;
            var my = mouse.y;
            var polygons = myState.polygons;
            var l = polygons.length;

            myState.paths.forEach(function ( path:any, i:number ) {
                if ( myState.ctx.isPointInPath(path, mx, my)) {
                    console.log('Canvas element found, id = ' + i );
                    myState.valid = false;
                    return;
                }
            });

            if (!myState.selection) {
                myState.selection = null;
                myState.valid = false;
            }
        }, true);

        window.requestAnimationFrame( myState.draw.bind(this) );
    }

    clear () : void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    getMouse ( e:Event ) :object {
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
            this.paths = [];

            let _this: any = this;

            this.polygons.forEach(function ( polygon:any ) {
                let path: any = new Path2D();

                polygon.way.forEach(function (elem:Array<number>) {
                    let x: number = elem[0];
                    let y: number = elem[1];
                    path.lineTo( x, y );
                })

                path.closePath();
                ctx.fillStyle = polygon.fill;
                ctx.fill(path);

                _this.paths.push(path);
            });

            this.valid = true;
        }
        window.requestAnimationFrame( this.draw.bind( this ) )
    }
}