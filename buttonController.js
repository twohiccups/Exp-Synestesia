var spaceDown = true;
$("button").on("click", function(e) {  
    $(this).toggleClass("on off")
    
    if ($(this).hasClass("off")) {
        chordSet.add($(this).index());
    }
    else {
        chordSet.delete($(this).index());
    }
});

$(document).on("keydown", function(e) {
    if(e.code == "Space") {
        e.preventDefault();
    }
});

$(document).on("keyup", function(e) {
    if(e.code == "Space") {
        e.preventDefault();
    }
});

$(document).on("mousedown", function() {
    clicked = true;
})
$(document).on("mouseup", function() {
    clicked = false;
})