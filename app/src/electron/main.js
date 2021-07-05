require('dotenv').config();
const { app, screen, BrowserWindow, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { DEFAULTS } = require('./constants');
const ipc = require('./ipc/ipcMain');

ipc.run();

let win = null;

const createWindow = () => {
    const screenWidth = screen.getPrimaryDisplay().bounds.width;
    const screenHeight = screen.getPrimaryDisplay().bounds.height;
    win = new BrowserWindow({
        width: DEFAULTS.width,
        height: DEFAULTS.height,
        // frame: false,
        // show: false,
        // x: screenWidth - DEFAULTS.width,
        // y: screenHeight - DEFAULTS.height,
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.on('close', (event) => {
        event.preventDefault();
        if (app.quitting) {
            app.exit();
        } else {
            console.log('we are closing');
            win.hide();
        }
    });

    win.loadURL(
        isDev
            ? process.env.REACT_APP_DEV_CLIENT_ADDRESS
            : `file://${path.join(__dirname, '..', '..', 'public', 'build/index.html')}`
    );
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }

    const globalResultTest = globalShortcut.register('Ctrl+Shift+Alt+X', () => {
        console.log('global key binding worked!');
    });
    if (!globalResultTest) {
        console.log('global key binding failed :(');
    }
};

app.on('before-quit', () => {
    app.quitting = true;
});

app.on('browser-window-focus', () => {
    console.log('we focused boys');
});

app.on('widevine-ready', () => {
    console.log('widevine-ready');
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
        win.show();
    });
});

app.on('widevine-error', (err) => {
    console.error(err);
    console.log('widevine-error');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
