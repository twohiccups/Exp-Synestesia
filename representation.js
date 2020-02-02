const width = 1000;
const height = 800;
var s = Snap(width, height);
s.attr({
    id: "svgcanvas"
});
const strokeWidth = 5;
const radius = 30
var rotationAngle = 19;

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

    rotate(angle) {
        this.matrix.rotate(angle, this.x, this.y);
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


function drawGrid(colSize, totalNotes, startX, startY, r) {
    var grid = []

    for (j = 0; j < totalNotes; j++) {

        const numColomn = Math.floor(j / colSize)
        const adjustX = 2 * r * numColomn

        const adjustEvenRows = numColomn % 2 == 0 ? r : 0
        const mod = j % colSize;
        const adjustY = mod * 2 * r + adjustEvenRows;

        console.log(startX + adjustX)
        console.log(startX + startY + adjustY)

        var hex = new Hex(startX + adjustX, startY + adjustY, r);
        hex.hex.node.hexId = j;
        
        color = Snap.hsb(j / totalNotes, 1 - mod * 0.5 / colSize, 0.9)
        hex.colorHexagon(color);
        grid.push(hex);
    }
    return grid;
}

s.attr({
    "background-color": "blue"
})