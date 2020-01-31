const width = 1000;
const height = 800;
var s = Snap(width, height);
const strokeWidth = 5;
const radius = 30
var rotationAngle = 19;

var background = s.rect(0,0,width, height);
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
        this.matrix = Snap.matrix(1,0,0,1,0,0);
        this.setMousedownEventHandler()
        this.setMouseoverEventHandler()
    }
    
    drawHexagon(r) {
        var points = [];
        for (i = 0; i < 6; i++) {
            if (i%2 == 0) {
                points.push(this.x + r * Math.cos(i * 2 * Math.PI / 6));
                points.push(this.y + r * Math.sin(i * 2 * Math.PI / 6));            
            }
            else {
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
        "stroke-width": strokeWidth}); 
    }
    
    drawBoxBounds(x, y, r) {
        var points = [];
        for (i = 0; i < 3; i++) {
            points.push(x)
            points.push(y)
            points.push(x + (r-2) * Math.cos(i * 2 * 2 * Math.PI / 6));
            points.push(y + (r-2) * Math.sin(i * 2 * 2 * Math.PI / 6));
        }  
        return s.polyline(points);
    }
    
    rotate(angle) {
        this.matrix.rotate(angle, this.x, this.y);
        this.group.transform(this.matrix);
    }
    
    setMousedownEventHandler() {
        const hex = this;
        this.group.mousedown(function() {
                hex.rotate(rotationAngle);
                playNote(hex.id);
                
        });
    }
    setMouseoverEventHandler(action, args) {
        const hex = this;
        this.group.mouseover(function() {
            if(clicked) {
                hex.rotate(rotationAngle);
                playNote(hex.id);
            }
        });
    }
       
}

function drawBoxBounds(r) {
    var points = [];
    for (i = 0; i < 3; i++) {
        points.push(this.x)
        points.push(this.y)
        points.push(this.x + (r-2) * Math.cos(i * 2 * 2 * Math.PI / 6));
        points.push(this.y + (r-2) * Math.sin(i * 2 * 2 * Math.PI / 6));
    }  
    return s.polyline(points);
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
        const coordY = startY + (mod * 2 * r + adjustParity);
        
        var hex = new Hex(startX, coordY, r);
        
        hex.group.centerX = startX;
        hex.group.centerY = coordY;
        hex.id = notes;
//        grid.push(hex.group);
        grid.push(hex);
        
        color = Snap.hsb(notes/maxNotes * 360, 0.5 - mod*0.5/colSize, 1)
        if (mod == 0) {
            startX += 2 * r
            parity = !parity; 
            hue = notes / maxNotes * 360;
        }
        hex.colorHexagon(color);
    }
    return grid;
}

s.attr({"background-color": "blue"})

