import { FETCH_SPOTIFY_USER_DATA, CHECK_IF_LOGGED_IN } from './constants';
import axios from 'axios';
const { ipcRenderer } = window.require('electron');

export const fetchSpotifyUserData = () => (dispatch) => {
    dispatch({ type: FETCH_SPOTIFY_USER_DATA.REQUEST });
    ipcRenderer.send(CHECK_IF_LOGGED_IN);
    ipcRenderer.once(CHECK_IF_LOGGED_IN, (_, data) => {
        if (data) {
            dispatch({ type: FETCH_SPOTIFY_USER_DATA.SUCCESS, payload: data });
        } else {
            dispatch({ type: FETCH_SPOTIFY_USER_DATA.FAILED, payload, data });
        }
    });
};
