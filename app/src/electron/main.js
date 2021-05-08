require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { DEFAULTS, DEV_CLIENT_URL } = require('./constants');
const Store = require('electron-store');
const { ipcMain } = require('electron');

const store = new Store();

ipcMain.on('CHECK_IF_LOGGED_IN', (event, data) => {
    console.log(process.env.REACT_APP_SERVER_ADDRESS);
    const yummy = store.get('yummy');
    store.set('yummy', data);
    console.log(yummy);
});

function createWindow() {
    const win = new BrowserWindow({
        width: DEFAULTS.width,
        height: DEFAULTS.height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    // win.loadFile(path.join(__dirname, '..', 'src', 'index.js'));
    win.loadURL(
        isDev
            ? DEV_CLIENT_URL
            : `file://${path.join(__dirname, '..', '..', 'public', 'build/index.html')}`
    );
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
