
const minFreq = 200;
const maxDistanceHZ = 500;
const notes = 102;
const columns = 6;

var comp = new Tone.Compressor(-30, 10);
var synth =  new Tone.PolySynth(16, Tone.Synth)
synth.connect(comp)
comp.toMaster()
var noteFrequencies = genererateFrequencies(notes, minFreq, 1.04);

function genererateFrequencies(notes, minFreq, step) {
    var freqs = [];
    freqs.push(minFreq);
    for(i = 1; i < notes; i++) {
        freqs.push(freqs[i-1] * step)
    }
    return freqs;
}


var hexGrid = drawGrid(columns, notes, 100, 400, 25);
console.log(hexGrid)

var chordSet = new Set();

function calculateNotes(index) {
      var notes = Array.from(chordSet).map((el) => el*2 + index)
      notes.push(index)
    notes = notes.map((el) => noteFrequencies[el])
    console.log(notes)
    return notes
}
for (i = 0; i < hexGrid.length; i++) {
    hexGrid[i].index = i;
    hexGrid[i].mouseover(function() {
        background.attr({
            fill: this.attr("fill")
        });
    
        synth.triggerAttackRelease( calculateNotes(this.index), '8n')

    });
}
    
