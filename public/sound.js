/*--------------------------------------------------------------
Uses tone.js library to create the scale, assign frequencies to notes, and create sound.
--------------------------------------------------------------*/ 

var baseFrequency = 20;
const compressionLevel = 10;
const noteLength = '8n'
var ratio = 1.09665;

var comp = new Tone.Compressor(-30, compressionLevel);
var synth = new Tone.PolySynth(16, Tone.Synth)
synth.connect(comp)
comp.toMaster();
var noteFrequencies;


function genererateFrequencies(notes, baseFrequency, step) {
    noteFrequencies = [];
    noteFrequencies.push(baseFrequency);
    for (i = 0; i < notes; i++) {
        noteFrequencies.push(noteFrequencies[i] * step)
    }
}

function calculateNotes(index) {
    var notes = Array.from(chordSet).map((el) => el * 2 + index)
    notes.push(index);
    notes = notes.map((el) => noteFrequencies[el])
    return notes;
}

function centsToRatio(cents) {
    return Math.pow(2, cents / 1200)
}

function ratioToCents(ratio) {
    return 0
}

function edoToRatio(edo) {
    return Math.pow(2, 1 / edo)
}

function ratioToEdo(ratio) {
    return 0
}


function playNote(index) {
    synth.triggerAttackRelease(calculateNotes(index), noteLength)
}