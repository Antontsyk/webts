import Point from "./point";

export default class Polygon {
    public way: Array<Point>;
    public fill: string;
    public path: any;
    public intersection: Array<number> = [];

    constructor( way: Array<Point>, fill: string ){
        this.way = way;
        this.fill = fill || '#AAAAAA';
        this.updatePath();
    }

    private updatePath() {
        let path: any = new Path2D();
        this.way.forEach((point: Point) => {
            path.lineTo( point.x, point.y );
        });
        path.closePath();

        this.path = path;
    }

    public updatePolygon(deltaX: number, deltaY: number) {
        this.way.map(( point: Point ) => {
            point.x += deltaX;
            point.y += deltaY;
        });
        this.updatePath();
    }
}