/*--------------------------------------------------------------
The view for hex keyboard.
--------------------------------------------------------------*/ 

var sets = [
['notes', 'rows', 'factor'],
[336, 12, 0.33],
[152, 8, 0.5], 
[84, 6, 0.7],
[40, 4, 1]
];

var notes = 336;
const factor = 0.33;
const rows = 12;

const width = 500;
const height = 300;
const startX = 10;
const startY = 10;

const strokeWidth = 5 * factor;
var rotationAngle = 60;

var radius = 25 * factor;



var s = Snap('#svgcanvas');

s.attr({
    preserveAspectRatio: 'xMaxYMax',
    viewBox: `0 0 ${width} ${height}`,
});

var background = s.rect(0, 0, width, height);
background.attr({
    fill: "transparent",

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
            fill: color,
            "stroke": "#111",
            "stroke-width": strokeWidth
        });
    }

    colorBoxBounds() {
        this.boundBox.attr({
            fill: "transparent",
            "stroke": "#111",
            "stroke-width": strokeWidth
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
        this.group.transform(this.matrix);
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


function drawGrid(totalNotes) {
    var grid = []

    for (j = 0; j < totalNotes; j++) {

        const numColomn = Math.floor(j / rows)
        const adjustX = 2 * radius * numColomn

        const adjustEvenRows = numColomn % 2 == 0 ? radius : 0
        const mod = j % rows;
        const adjustY = mod * 2 * radius + adjustEvenRows;

        var hex = new Hex(startX + adjustX, startY + adjustY, radius);
        hex.hex.node.hexId = j;
        
        color = Snap.hsb(j / totalNotes, 1 - mod * 0.5 / rows, 0.9)
        hex.colorHexagon(color);
        grid.push(hex);
    }
    return grid;
}

s.attr({
    "background-color": "blue"
})