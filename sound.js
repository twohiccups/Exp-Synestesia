/*--------------------------------------------------------------
Uses tone.js library to create the scale, assign frequencies to notes, and create sound.
--------------------------------------------------------------*/ 

var baseFrequency = 200;
const maxDistanceHZ = 500;
const compressionLevel = 15;
const noteLength = '16n'
const ratio = 1.005665;
// var ratio = 1.09665;

var comp = new Tone.Compressor(-30, compressionLevel);
var synth = new Tone.PolySynth(16, Tone.Synth)
synth.connect(comp)
comp.toMaster();
var noteFrequencies;

genererateFrequencies(notes, baseFrequency, ratio);

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

function playNote(index) {
    synth.triggerAttackRelease(calculateNotes(index), noteLength)
}