require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { DEFAULTS } = require('./constants');
const Store = require('electron-store');
const { ipcMain } = require('electron');

const store = new Store();

ipcMain.on('GET_SPOTIFY_ID', (event, _) => {
    const spotifyId = store.get('spotifyId');
    console.log('[GET_SPOTIFY_ID]  ' + spotifyId);
    event.reply('GET_SPOTIFY_ID', { spotifyId });
});

ipcMain.on('SAVE_SPOTIFY_ID', (_, { spotifyId }) => {
    console.log('[SAVE_SPOTIFY_ID]  ' + spotifyId);
    store.set('spotifyId', spotifyId);
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
            ? process.env.REACT_APP_DEV_CLIENT_ADDRESS
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
