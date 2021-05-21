import axios from 'axios';

import { FETCH_USER_DATA, CHECK_IF_LOGGED_IN } from './constants';
import { SERVER_URL } from './constants';
const { ipcRenderer } = window.require('electron');

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1/me/';

const spotifyConfig = ({ accessToken, params }) => ({
    params: { ...params },
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
    },
});

export const fetchUserPlaylists = ({ offset, accessToken }) =>
    axios.get(
        SPOTIFY_BASE_URL + 'playlists',
        spotifyConfig({ accessToken, params: { limit: 5, offset } })
    );

export const fetchAccessToken = ({ spotifyId }) =>
    axios.get(SERVER_URL.ACCESS_TOKEN, { params: { spotify_id: spotifyId } });

// export const fetchUserData = () => (dispatch) => {
//     dispatch({ type: FETCH_USER_DATA.REQUEST });
//     // try to get user data from local save file.  Else request from server and update local
//     ipcRenderer.send(CHECK_IF_LOGGED_IN);
//     ipcRenderer.once(CHECK_IF_LOGGED_IN, (_, data) => {
//         if (data) {
//             return dispatch({ type: FETCH_USER_DATA.SUCCESS, payload: data });
//         } else {
//             axios.get(process.env.REACT_APP_SERVER_ADDRESS + '');
//         }
//     });
//     dispatch({ type: FETCH_USER_DATA.FAILED, payload: data });
// };
