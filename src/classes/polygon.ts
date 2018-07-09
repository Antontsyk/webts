import Point from "./point";

export default class Polygon {
    public way: Array<Point>;
    public fill: string;
    public path: any;

    constructor( way: Array<Point>, fill: string ){
        this.way = way;
        this.fill = fill || '#AAAAAA';
    }
}