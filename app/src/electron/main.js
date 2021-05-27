require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { DEFAULTS } = require('./constants');
const { ipcMain } = require('electron');
const Store = require('electron-store');

const store = new Store();
ipcMain.on('GET_USER_DATA', (event, _) => {
    const userData = store.get('userData');
    console.log('[GET_USER_DATA]  ' + userData);
    event.reply('GET_USER_DATA', userData);
});

ipcMain.on('SAVE_USER_DATA', (_, data) => {
    console.log('[SAVE_USER_DATA]  ' + data);
    store.set('userData', data);
});

function createWindow() {
    const win = new BrowserWindow({
        width: DEFAULTS.width,
        height: DEFAULTS.height,
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // win.loadFile(path.join(__dirname, '..', 'src', 'index.js'));
    win.loadURL(
        isDev
            ? process.env.REACT_APP_DEV_CLIENT_ADDRESS
            : `file://${path.join(__dirname, '..', '..', 'public', 'build/index.html')}`
    );
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

app.whenReady().then(() => {
    // createWindow();
});

app.on('widevine-ready', () => {
    console.log('widevine-ready');
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('widevine-error', () => {
    console.log('widevine-error');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
