
const minFreq = 200;
const maxDistanceHZ = 500;
const notes = 51;
const columns = 5;
var synth = new Tone.Synth().toMaster()



var hexGrid = drawGrid(columns, notes, 100, 400, 30);
console.log(hexGrid)

for (i = 0; i < hexGrid.length; i++) {
    hexGrid[i].index = i;
    hexGrid[i].click(function() {
        background.attr({
            fill: this.attr("fill")
        });
        synth.triggerAttackRelease(minFreq + this.index / notes * maxDistanceHZ , '8n')

    });
  
    
    
}
    