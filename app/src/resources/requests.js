import axios from 'axios';

// import { FETCH_USER_DATA, CHECK_IF_LOGGED_IN } from './constants';
import { SERVER_URL } from './constants';
const { ipcRenderer } = window.require('electron');

const SPOTIFY_BASE_ME_URL = 'https://api.spotify.com/v1/me/';
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1/';

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
        SPOTIFY_BASE_ME_URL + 'playlists',
        spotifyConfig({ params: { limit: 50, offset }, accessToken })
    );

export const fetchCurrentPlayback = ({ accessToken }) =>
    axios.get(SPOTIFY_BASE_ME_URL + 'player', spotifyConfig({ accessToken }));

export const fetchPlaylist = ({ playlistId, accessToken }) =>
    axios.get(SPOTIFY_BASE_URL + 'playlists/' + playlistId, spotifyConfig({ accessToken }));

export const fetchAccessToken = ({ spotifyId }) =>
    axios.get(SERVER_URL.ACCESS_TOKEN, { params: { spotify_id: spotifyId } });
