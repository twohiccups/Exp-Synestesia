$("button").on("click", function() {  
    $(this).toggleClass("on off")
    
    if ($(this).hasClass("off")) {
        chordSet.add($(this).index());
    }
    else {
        chordSet.delete($(this).index());
    }
        
    console.log(chordSet)

    
});