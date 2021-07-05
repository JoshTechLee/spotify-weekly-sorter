import axios from 'axios';

// import { FETCH_USER_DATA, CHECK_IF_LOGGED_IN } from './constants';
import { SERVER_URL } from './constants';
const { ipcRenderer } = window.require('electron');

const SPOTIFY_BASE_ME_URL = 'https://api.spotify.com/v1/me/';
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1/';

const spotifyGetConfig = ({ accessToken, params, body }) => ({
    params: { ...params },
    data: { ...body },
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
    },
});

const spotifyPostConfig = ({ accessToken }) => ({
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
    },
});

export const fetchUserPlaylists = ({ offset, accessToken }) =>
    axios.get(
        SPOTIFY_BASE_ME_URL + 'playlists',
        spotifyGetConfig({ params: { limit: 50, offset }, accessToken })
    );

export const fetchCurrentPlayback = ({ accessToken }) =>
    axios.get(SPOTIFY_BASE_ME_URL + 'player', spotifyGetConfig({ accessToken }));

export const fetchPlaylist = ({ playlistId, accessToken }) =>
    axios.get(SPOTIFY_BASE_URL + 'playlists/' + playlistId, spotifyGetConfig({ accessToken }));

export const fetchAccessToken = ({ spotifyId }) =>
    axios.get(SERVER_URL.ACCESS_TOKEN, { params: { spotify_id: spotifyId } });

export const startRemoteSDK = ({ deviceId, accessToken }) => {
    return axios.put(
        SPOTIFY_BASE_ME_URL + 'player/play',
        {
            context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
            offset: {
                position: 5,
            },
            position_ms: 0,
        },
        spotifyGetConfig({
            params: { device_id: deviceId },
            accessToken,
        })
    );
};
