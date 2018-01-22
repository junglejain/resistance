desc_num = function (num) {
    if (num < 1)
        return 'None';
    else if (num <38)
        return 'Rare';
    else if (num <63)
        return 'Normal';
    else if (num < 88)
        return 'Common';
    else
        return 'Many';
};

do_range = function(){
    rng = document.querySelectorAll('.num_rng');
    for (let i = 0, len = rng.length; i < len; i++) {
        let count = document.querySelector('#'+rng[i].id+'_ct');

        count.textContent = desc_num(rng[i].value);

        rng[i].oninput = function() {
            count.textContent = desc_num(rng[i].value);
        }
    }
};

window.onload = function(){
    let prefs = global.prefs;
    let keys = Object.keys(prefs);
    for (let i = 0, len = keys.length; i < len; i++) {
        let rng = document.querySelector('#'+keys[i]);
        rng.value = prefs[keys[i]];
    }
    do_range();
};

btn_Save = function(){
    let keys = Object.keys(global.prefs);
    for (let i = 0, len = keys.length; i < len; i++) {
        let rng = document.querySelector('#'+keys[i]);
        global.prefs[keys[i]] = rng.value;
    }
    global.prefs.saveToDB();
};