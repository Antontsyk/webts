export default class CanvasState {
    private canvas: HTMLElement;
    private width: number;
    private height: number;
    private context: any;
    private polygons: Array<any> = [];
    private selectionIndexElement: number = -1;
    private deltaMouse: any = { x: 0, y: 0 };

    constructor ( canvas: any, Polygons: Array<any> ) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.polygons = Polygons;
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), true);
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), true);
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this), true);
        this.draw();
    }

    private onMouseDown ( event: MouseEvent ) {
        const mouse: any = this.getMouse( event );
        const mx: number = mouse.x;
        const my: number = mouse.y;
        this.deltaMouse = { x: -mx, y: -my };
        this.selectionIndexElement = this.polygons.findIndex( ( polygon: any ) => {
            return this.context.isPointInPath( polygon.path, mx, my )
        });
        this.selectionIndexElement != -1 ? this.draw() : '';
    }

    private onMouseMove ( event: MouseEvent ) {
        const mouse: any = this.getMouse( event );
        const deltaX: number = this.deltaMouse.x + mouse.x;
        const deltaY: number = this.deltaMouse.y + mouse.y;
        this.deltaMouse = { x: -mouse.x, y: -mouse.y };
        if( this.selectionIndexElement != -1 ){
            this.polygons[ this.selectionIndexElement ].updatePolygon( deltaX, deltaY );
            this.draw();
        }
    }

    private onMouseUp (){
        this.selectionIndexElement = -1;
    }

    private clear (): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    private getMouse ( event: MouseEvent ): object {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }

    private draw (): void {
        this.clear();
        this.polygons.forEach(( polygon: any, index: number ) => {
            this.selectionIndexElement == index ? this.context.fillStyle = 'red' : this.context.fillStyle = polygon.fill;
            this.context.fill(polygon.path);
        });
    }
}