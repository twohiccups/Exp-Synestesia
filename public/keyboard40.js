/*--------------------------------------------------------------
Assigns playNote() to keyboard events. Designed for 40 note keyboard.
--------------------------------------------------------------*/


var keyToNoteAssignment = {
    "Digit1": 0,
    "KeyQ": 1,
    "KeyA": 2,
    "KeyZ": 3,
    "Digit2": 4,
    "KeyW": 5,
    "KeyS": 6,
    "KeyX": 7,
    "Digit3": 8,
    "KeyE": 9,
    "KeyD": 10,
    "KeyC": 11,
    "Digit4": 12,
    "KeyR": 13,
    "KeyF": 14,
    "KeyV": 15,
    "Digit5": 16,
    "KeyT": 17,
    "KeyG": 18,
    "KeyB": 19,
    "Digit6": 20,
    "KeyY": 21,
    "KeyH": 22,
    "KeyN": 23,
    "Digit7": 24,
    "KeyU": 25,
    "KeyJ": 26,
    "KeyM": 27,
    "Digit8": 28,
    "KeyI": 29,
    "KeyK": 30,
    "Comma": 31,
    "Digit9": 32,
    "KeyO": 33,
    "KeyL": 34,
    "Period": 35,
    "Digit0": 36,
    "KeyP": 37,
    "Semicolon": 38,
    "Slash": 39
}

$(document).on("keydown", function (e) {
    if (keyToNoteAssignment[e.code]) {
        playNote(keyToNoteAssignment[e.code]);
        hexGrid[keyToNoteAssignment[e.code]].rotate(19);

        e.stopPropagation();
    }
})

$("#enable-keyboard40-button").on("click", function(e) {
    enableKeyboard40 = !enableKeyboard40;
    e.stopImmediatePropagation();
});