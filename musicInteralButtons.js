/*--------------------------------------------------------------
Create buttons which allow to play more than one note (currently not effective).
--------------------------------------------------------------*/ 

const mod = 4;
for(i = 1; i < 17; i++) {
    const el = `<button class="interval-button on">${i}</button>`
    $('#intervalButtonsDiv').append(el);
    if(i % mod == 0) {
        $('#intervalButtonsDiv').append("<br>");
    }
    
}

