import { GET_SPOTIFY_ACCESS_TOKEN, GET_SPOTIFY_USER_DATA } from '../../resources/constants';

const getSpotifyAccessToken = {
    request: ({ spotifyId }) => ({
        type: GET_SPOTIFY_ACCESS_TOKEN.REQUEST,
        spotifyId,
    }),
    success: ({ accessToken }) => ({
        type: GET_SPOTIFY_ACCESS_TOKEN.SUCCESS,
        accessToken,
    }),
    failure: ({ message }) => ({
        type: GET_SPOTIFY_ACCESS_TOKEN.FAILURE,
        message,
    }),
};

const getSpotifyUserData = {
    request: () => ({
        type: GET_SPOTIFY_USER_DATA.REQUEST,
    }),
    success: ({ spotifyId }) => ({
        type: GET_SPOTIFY_USER_DATA.SUCCESS,
        spotifyId,
    }),
    failure: ({ message }) => ({
        type: GET_SPOTIFY_USER_DATA.FAILURE,
        message,
    }),
};

const saveSpotifyAccessToken = ({ accessToken }) => ({ type: 'SAVE_ACCESS_TOKEN', accessToken });

const loginToSpotify = () => ({ type: 'LOGIN_TO_SPOTIFY' });

const action = {
    getSpotifyAccessToken,
    getSpotifyUserData,
    loginToSpotify,
    saveSpotifyAccessToken,
};

export default action;
