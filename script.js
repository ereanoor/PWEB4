let statusLampu = {
    'l1': false, 'l2': false, 'l3': false,
    'la': false, 'lb': false, 'lc': false, 'ld': false
};

function tekanLampu(id) {
    const lampu = document.getElementById(id);
    if (statusLampu[id]) {
        lampu.src = 'images/off.gif';
        statusLampu[id] = false;
    } else {
        lampu.src = 'images/on.gif';
        statusLampu[id] = true;
    }
}

function tekanGrup(kumpulanId) {
    let patokan = statusLampu[kumpulanId[0]];
    
    for (let i = 0; i < kumpulanId.length; i++) {
        let id = kumpulanId[i];
        if (patokan) {
            document.getElementById(id).src = 'images/off.gif';
            statusLampu[id] = false;
        } else {
            document.getElementById(id).src = 'images/on.gif';
            statusLampu[id] = true;
        }
    }
}