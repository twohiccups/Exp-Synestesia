const columns = 6;
//const ratio = 1.025665;
var clicked = false;

//var path = "M 100 200 C 500 200 600 300 700 200 C 800 100 900 100 900 100";
//s.text(10, 50, "Hello, Sluts! Welcome to Proj. Here's some stuff. microtonal!").attr({
//    "font-size": 40,
//    "font-weight": 700,
//    "textpath": path
//});



var hexGrid = drawGrid(columns, notes, 30, 400, 25);

var chordSet = new Set();


$(document).ready(function () {
    $("#svgcanvas").on("mousedown", function (e) {
        if (e.target.nodeName == "polygon") {
            playNote(e.target.hexId)
        }
    })
    $("#svgcanvas").on("mouseover", function (e) {
        if (e.target.nodeName == "polygon") {
            if (clicked) {
                playNote(e.target.hexId)
            }
        }
        e.stopPropagation()
    });
});
