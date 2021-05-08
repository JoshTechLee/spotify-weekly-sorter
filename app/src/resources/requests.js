import { FETCH_SPOTIFY_USER_DATA, CHECK_IF_LOGGED_IN } from './constants';
import axios from 'axios';
const { ipcRenderer } = window.require('electron');

export const fetchSpotifyUserData = () => (dispatch) => {
    dispatch({ type: FETCH_SPOTIFY_USER_DATA.REQUEST });

    // try to get user data from local save file.  Else request from server and update
    ipcRenderer.send(CHECK_IF_LOGGED_IN);
    ipcRenderer.once(CHECK_IF_LOGGED_IN, (_, data) => {
        if (data) {
            return dispatch({ type: FETCH_SPOTIFY_USER_DATA.SUCCESS, payload: data });
        } else {
            axios.get();
        }
    });
    dispatch({ type: FETCH_SPOTIFY_USER_DATA.FAILED, payload, data });
};
