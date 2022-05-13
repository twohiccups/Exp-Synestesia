/*--------------------------------------------------------------
The view for hex keyboard.
--------------------------------------------------------------*/ 

var sizes = [
    {'notes': 40,  'rows': 4,  'radius': 20, 'strokeWidth': 4},
    {'notes': 84,  'rows': 6,  'radius': 15, 'strokeWidth': 3},
    {'notes': 152, 'rows': 8,  'radius': 10, 'strokeWidth': 2},
    {'notes': 336, 'rows': 12, 'radius': 7,  'strokeWidth': 2},
];

var notes;
var strokeWidth;
var rows;
var radius;
var startPoint;

setSynthSize(0)

const width = 410;
const height = 300;



var rotationAngle = 60;





var s = Snap('#svgcanvas');

s.attr({
    'preserveAspectRatio': 'xMaxYMax',
    'viewBox': `0 0 ${width} ${height}`,
});




class Hex {

    constructor(x, y, r, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.hex = this.drawHexagon(r);
        this.boundBox = this.drawBoxBounds(r);
        this.group = s.group(this.hex);
        this.matrix = Snap.matrix(1, 0, 0, 1, 0, 0);
    }

    drawHexagon(r) {
        var points = [];
        for (i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                points.push(this.x + r * Math.cos(i * 2 * Math.PI / 6));
                points.push(this.y + r * Math.sin(i * 2 * Math.PI / 6));
            } else {
                points.push(this.x + r * Math.cos(i * 2 * Math.PI / 6));
                points.push(this.y + r * Math.sin(i * 2 * Math.PI / 6));
            }
        }
        return s.polygon(points);
    }

    colorHexagon(color) {
        var color = s.gradient("l(0, 0, 1, 1)#000-" + color + "-#fff");
        this.hex.attr({
            'fill': color,
            'stroke': "#111",
            'stroke-width': strokeWidth
        });
    }

    colorBoxBounds() {
        this.boundBox.attr({
            'fill': "transparent",
            'stroke': "#111",
            'stroke-width': strokeWidth
        });
    }

    drawBoxBounds(x, y, r) {
        var points = [];
        for (i = 0; i < 3; i++) {
            points.push(x)
            points.push(y)
            points.push(x + (r - 2) * Math.cos(i * 2 * 2 * Math.PI / 6));
            points.push(y + (r - 2) * Math.sin(i * 2 * 2 * Math.PI / 6));
        }
        return s.polyline(points);
    }

    rotate() {
        this.matrix.rotate(rotationAngle, this.x, this.y);
        // this.group.animate({'transform': this.matrix}, 500, mina.easein)
        this.group.transform(this.matrix);
        // this.group.animate({'transform': `r60, ${this.x}, ${this.y}`}, 500, mina.easein)

    }


}

function drawBoxBounds(r) {
    var points = [];
    for (j = 0; j < 3; j++) {
        points.push(this.x)
        points.push(this.y)
        points.push(this.x + (r - 2) * Math.cos(j * 2 * 2 * Math.PI / 6));
        points.push(this.y + (r - 2) * Math.sin(j * 2 * 2 * Math.PI / 6));
    }
    return s.polyline(points);
}


function setSynthSize(size) {
    if (size >= 0 && size < sizes.length) {
        notes = sizes[size].notes;
        strokeWidth = sizes[size].strokeWidth;
        rows = sizes[size].rows;
        radius = sizes[size].radius;
        startPoint = radius + strokeWidth;

    }
}


function drawGrid() {
    var grid = []

    for (j = 0; j < notes; j++) {

        const numColomn = Math.floor(j / rows)
        const adjustX = 2 * radius * numColomn

        const adjustEvenRows = numColomn % 2 == 0 ? radius : 0
        const mod = j % rows;
        const adjustY = mod * 2 * radius + adjustEvenRows;

        var hex = new Hex(startPoint + adjustX, startPoint + adjustY, radius);
        hex.hex.node.hexId = j;
        
        color = Snap.hsb(j / notes, 1 - mod * 0.5 / rows, 0.9)
        hex.colorHexagon(color);
        grid.push(hex);
    }
    return grid;
}

s.attr({
    "background-color": "blue"
})