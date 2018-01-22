const electron = require('electron');
const {app, BrowserWindow} = electron;
const ipc = require('electron').ipcMain;
require('electron-debug')({showDevTools: true});
const windowStateKeeper = require('electron-window-state');
Preferences = require('./src/base/prefs.js').Preferences;
global.prefs = new Preferences();

Datastore = require('nedb');
global.db = {};
global.db.prefs = new Datastore({ filename: 'data/prefs.ndb' });
global.db.prefs.loadDatabase();
global.db.prefs.find({}, function (err, docs) {
    if (err){
        console.log(err);
    }else{
        for (let i = 0, len = docs.length; i < len; i++) {
            global.prefs.set(docs[i]['name'], docs[i]['value']);
        }
    }
});

app.on('ready', () => {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1280,
        defaultHeight: 720
    });
    let win = new BrowserWindow({ 'show': false,
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height
    });

    mainWindowState.manage(win);
    win.loadURL(`file://${__dirname}/main.html`);
    win.webContents.on('did-finish-load', () => {
        win.show();
        win.focus();
    });

    win.on('closed', () => {
        prefsWin.destroy();
        prefsWin = null;
        win = null;
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    let prefsWin = new BrowserWindow({
        'show': false,
        'width': 800,
        'height': 600
    });

    prefsWin.loadURL(`file://${__dirname}/assets/html/prefs.html`);
    ipc.on('toggle-prefs', function(){
        if (prefsWin){
            if (prefsWin.isVisible()){
                prefsWin.hide();
            }else {
                prefsWin.show();
            }
        }
    });
});
