const { ipcRenderer } = window.require('electron');

const checkIfLoggedIn = (callback) => {
    ipcRenderer.send('GET_SPOTIFY_ID');
    return ipcRenderer.once('GET_SPOTIFY_ID', callback);
};

const ipc = {
    checkIfLoggedIn,
};

export default ipc;
