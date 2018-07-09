import Polygon from '../classes/polygon'
import Point from "../classes/point";

const Polygons: Array<Polygon> = [
    new Polygon( [
            new Point(10,10),
            new Point(100,50),
            new Point(40,110)
        ],
        'orange'
    ),
    new Polygon(
        [
            new Point(10,130),
            new Point(100,150),
            new Point(120,180),
            new Point(60,200),
            new Point(20,180)
        ],
        'black'
    ),
    new Polygon(
        [
            new Point(10,230),
            new Point(100,200),
            new Point(140,300),
            new Point(80,250),
            new Point(40,300)
        ],
        'green'
    )
];

export default Polygons;