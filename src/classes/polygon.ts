export default class Polygon {
    id: number;
    way: Array<Array<number>>;
    fill: string;
    constructor( way: Array<Array<number>>, fill: string, id:number ){
        this.id = id;
        this.way = way;
        this.fill = fill || '#AAAAAA';
    }
}