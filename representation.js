const width = 1000;
const height = 800;
var s = Snap(width, height);
const strokeWidth = 5;
const radius = 30

var background = s.rect(0,0,width, height);
background.attr({
    fill: "transparent",
    
});


var path = "M 100 200 C 500 200 600 300 700 200 C 800 100 900 100 900 100";
s.text(10, 50, "Hello, Sluts! Welcome to Proj. Here's some stuff. microtonal!").attr({
    "font-size": 40,
    "font-weight": 700,
    "textpath": path
});


function drawHexagon(x, y, r) {
    var points = [];
    for (i = 0; i < 6; i++) {
        points.push(x + r * Math.cos(i * 2 * Math.PI / 6));
        points.push(y + r * Math.sin(i * 2 * Math.PI / 6));
    }
    var hex = s.polygon(points);
    return hex;
}

function colorHexagon(hex, color) {
    hex.attr({
        fill: color,
        "stroke": "#111",
        "stroke-width": 5
    });
}

function drawGrid(colSize, notes, startX, startY, r) {
    var grid = []
    const maxNotes = notes * 1.0;
    var parity = false;
    var bottomLine = notes % colSize;
    notes += colSize - bottomLine;
    var hue = 0;
    while(notes-- > bottomLine) {
        const mod = notes % colSize;
        const adjustParity = parity? r : 0;
        var hex = drawHexagon(startX, startY + (mod * 2 * r + adjustParity),  r);
        
        grid.push(hex);
         color = Snap.hsb(notes/maxNotes*360, 1 - mod*0.8/colSize, 0.9)
        if (mod == 0) {
            startX += 2 * r
            parity = !parity; 
            hue = notes / maxNotes * 360;
        }
        colorHexagon(hex, color);       
    }
    return grid;
}

s.attr({"background-color": "blue"})

