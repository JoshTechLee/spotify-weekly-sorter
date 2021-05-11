const { ipcRenderer } = window.require('electron');

const checkIfLoggedIn = (callback) => {
    ipcRenderer.send('CHECK_IF_LOGGED_IN');
    ipcRenderer.once('CHECK_IF_LOGGED_IN', callback);
};

const ipc = {
    checkIfLoggedIn,
};

export default ipc;
