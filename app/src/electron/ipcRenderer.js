const { ipcRenderer } = window.require('electron');

const getId = () => {
    var spotifyId = '';
    ipcRenderer.send('GET_ID');
    ipcRenderer.once('GET_ID', (_, data) => (spotifyId = data.spotifyId));
    return spotifyId;
};

const setId = (data) => {
    ipcRenderer.send('SAVE_ID', data);
};

const ipc = {
    getId,
    setId,
};

export default ipc;
