import Point from "./point";

export default class CanvasState {
    canvas: HTMLElement;
    width: number;
    height: number;
    context: any;
    polygons: Array<any> = [];
    selectionIndexElement: number = -1;

    constructor ( canvas: any, Polygons: Array<any> ) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.polygons = Polygons;
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), true);
        this.draw();
    }

    private onMouseDown ( event: MouseEvent ) {
        const mouse: any = this.getMouse( event );
        const mx = mouse.x;
        const my = mouse.y;
        this.selectionIndexElement = this.polygons.findIndex( ( polygon: any ) => {
            return this.context.isPointInPath( polygon.path, mx, my )
        });
        this.selectionIndexElement != -1 ? this.draw() : '';
    }

    clear (): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    getMouse ( event: MouseEvent ): object {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }

    draw (): void {
        this.clear();
        this.polygons.forEach(( polygon: any, index: number ) => {
            let path: any = new Path2D();
            polygon.way.forEach((point: Point) => {
                path.lineTo( point.x, point.y );
            });
            path.closePath();
            this.selectionIndexElement == index ? this.context.fillStyle = 'red' : this.context.fillStyle = polygon.fill;
            this.context.fill(path);
            polygon.path = path;
        });
    }
}