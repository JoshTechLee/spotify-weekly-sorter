const { ipcMain } = require('electron');
const Store = require('electron-store');

const store = new Store();

module.exports.run = () => {
    ipcMain.on('GET_USER_DATA', (event, _) => {
        const userData = store.get('userData');
        console.log('[GET_USER_DATA]  ' + userData);
        event.reply('GET_USER_DATA', userData);
    });

    ipcMain.on('SAVE_USER_DATA', (_, data) => {
        console.log('[SAVE_USER_DATA]  ' + data);
        store.set('userData', data);
    });

    ipcMain.on('TRY_REMOTE', (event, data) => {
        console.log('[TRY_REMOTE]');
        data.connect().then((success) => {
            console.log('connection successful');
        });
    });
};
