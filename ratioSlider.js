$(document).ready(function () {
    console.log($("#ratio-input").val())

    if ($("#ratio-input").val()) {
        ratio = $("#ratio-input").val();
        genererateFrequencies(notes, minFreq, ratio);
    } else {
        ratio = 1.025665;
    }

    $("#ratio-slider").on("input", function () {
        //    $("#ratio-slider-num").text($(this).val());
        $("#ratio-input").val($(this).val())
    });

    $("#ratio-slider").on("change", function () {
        ratio = $(this).val();
        genererateFrequencies(notes, minFreq, ratio)

    });

    $("#ratio-input").on("change", function () {
        ratio = $(this).val();
        $("#ratio-slider").val(ratio);
        genererateFrequencies(notes, minFreq, ratio)
    });
});