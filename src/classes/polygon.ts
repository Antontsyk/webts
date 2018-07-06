export class Polygon {
    id: number;
    way: Array<Array<number>>;
    fill: string;
    constructor( way: Array<Array<number>>, fill: string, id:number ){
        this.id = id;
        this.way = way;
        this.fill = fill || '#AAAAAA';
    }
    draw( ctx: any ){
        let path: any = new Path2D();
        for (let i = 0; i < this.way.length; i++) {
            let x: number = this.way[i][0];
            let y: number = this.way[i][1];
            path.lineTo( x, y );
        }
        path.closePath();
        ctx.fillStyle = this.fill;
        ctx.fill(path);
        return path;
    }
}