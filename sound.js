const notes = 108;
const minFreq = 200;
const maxDistanceHZ = 500;
const compressionLevel = 15;
const noteLength = '16n'
const ratio = 1.025665;


var comp = new Tone.Compressor(-30, compressionLevel);
var synth =  new Tone.PolySynth(16, Tone.Synth)
synth.connect(comp)
comp.toMaster();
var noteFrequencies = genererateFrequencies(notes, minFreq, ratio);

function genererateFrequencies(notes, minFreq, step) {
    var freqs = [];
    freqs.push(minFreq);
    for(i = 1; i < notes; i++) {
        freqs.push(freqs[i-1] * step)
    }
    return freqs;
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