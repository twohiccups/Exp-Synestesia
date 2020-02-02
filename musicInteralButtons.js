

const mod = 4;
for(i = 1; i < 17; i++) {
    const el = `<button class="on">${i}</button>`
    $('#intervalButtonsDiv').append(el);
    if(i % mod == 0) {
        $('#intervalButtonsDiv').append("<br>");
    }
    
}

