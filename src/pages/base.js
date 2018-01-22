remote = require('electron').remote;
window.prefs = remote.getGlobal('prefs');

const ipc = require('electron').ipcRenderer;

std = {
    clickSettings: function(){
        ipc.send('toggle-prefs');
    },

    hideMe: function(name){
        ipc.send(`toggle-${name}`);
    }
};