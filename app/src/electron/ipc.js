const { ipcRenderer } = window.require('electron');

const getSpotifyId = (callback) => {
    ipcRenderer.send('GET_SPOTIFY_ID');
    ipcRenderer.once('GET_SPOTIFY_ID', callback);
};

const setSpotifyId = (data, callback = null) => {
    ipcRenderer.send('SAVE_SPOTIFY_ID', data);
};

const ipc = {
    getSpotifyId,
    setSpotifyId,
};

export default ipc;
