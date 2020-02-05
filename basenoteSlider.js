/*--------------------------------------------------------------
Slider for changing distance between two consequtive notes.
--------------------------------------------------------------*/ 
$(document).ready(function () {
    console.log($("#basenote-input").val())

    if ($("#basenote-input").val()) {
        baseFrequency = $("#basenote-input").val();
        genererateFrequencies(notes, baseFrequency, ratio);
    } else {
        baseFrequency = 200;
    }

    $("#basenote-slider").on("input", function () {
        //    $("#ratio-slider-num").text($(this).val());
        $("#basenote-input").val($(this).val())
    });

    $("#basenote-slider").on("change", function () {
        baseFrequency = $(this).val();
        genererateFrequencies(notes, baseFrequency, ratio)

    });

    $("#basenote-input").on("change", function () {
        baseFrequency = $(this).val();
        $("#basenote-slider").val(baseFrequency);
        genererateFrequencies(notes, baseFrequency, ratio)
    });
});