/*--------------------------------------------------------------
Slider for changing distance between two consequtive notes.
--------------------------------------------------------------*/ 
$(document).ready(function () {

    genererateFrequencies(notes, baseFrequency, ratio);

    $('.size-control').on('click', function() {
        s.clear();
        let size = parseInt($(this).attr('size'));
        setSynthSize(size);
        genererateFrequencies(notes, baseFrequency, ratio);
        hexGrid = drawGrid();

    })


    $('#cents').on('change', function () {
        if ($(this).val() > 0) { 
            ratio = centsToRatio($(this).val());
            genererateFrequencies(notes, baseFrequency, ratio);
        }
    });

    $('#ratio').on('change', function () {
        if ($(this).val() > 0) {
            ratio = $(this).val();
            genererateFrequencies(notes, baseFrequency, ratio)
        }
    });

    $('#edo').on('change', function () {
        if ($(this).val() > 0) { 
            ratio = edoToRatio($(this).val());
            genererateFrequencies(notes, baseFrequency, ratio)
        }
    });

});