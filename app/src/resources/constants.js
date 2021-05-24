// Electron
export const CHECK_IF_LOGGED_IN = 'CHECK_IF_LOGGED_IN';

export const SERVER_URL = {
    LOGIN: process.env.REACT_APP_SERVER_ADDRESS + '/spotify/login',
    ACCESS_TOKEN: process.env.REACT_APP_SERVER_ADDRESS + '/spotify/token',
};

export const ActionTypes = {
    GET_ACCESS_TOKEN: {
        REQUEST: 'GET_ACCESS_TOKEN_REQUEST',
        SUCCESS: 'GET_ACCESS_TOKEN_SUCCESS',
        FAILURE: 'GET_ACCESS_TOKEN_FAILURE',
    },
    GET_USER_DATA: {
        REQUEST: 'GET_USER_DATA_REQUEST',
        SUCCESS: 'GET_USER_DATA_SUCCESS',
        FAILURE: 'GET_USER_DATA_FAILURE',
    },
    GET_USER_PLAYLISTS: {
        REQUEST: 'GET_USER_PLAYLISTS_REQUEST',
        SUCCESS: 'GET_USER_PLAYLISTS_SUCCESS',
        FAILURE: 'GET_USER_PLAYLISTS_FAILURE',
    },
    GET_CURRENT_PLAYLIST_SONGS: {
        REQUEST: 'GET_CURRENT_PLAYLIST_SONGS_REQUEST',
        SUCCESS: 'GET_CURRENT_PLAYLIST_SONGS_SUCCESS',
        FAILURE: 'GET_CURRENT_PLAYLIST_SONGS_FAILURE',
    },
    GET_CURRENT_PLAYBACK_DATA: {
        REQUEST: 'GET_CURRENT_PLAYBACK_DATA_REQUEST',
        SUCCESS: 'GET_CURRENT_PLAYBACK_DATA_SUCCESS',
        FAILURE: 'GET_CURRENT_PLAYBACK_DATA_FAILURE',
    },
    SAVE_SPOTIFY: {
        ACCESS_TOKEN: 'SAVE_ACCESS_TOKEN',
        USER_DATA: 'SAVE_USER_DATA',
    },
    CLEAR_USER_PLAYLISTS: 'CLEAR_USER_PLAYLISTS',
    RUN_THROUGH_CHECKLIST: 'RUN_THROUGH_CHECKLIST',
    HIDE_ERROR: 'HIDE_ERROR',
};
