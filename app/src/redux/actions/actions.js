const getSpotifyAccessToken = {
    request: ({ spotifyId }) => ({
        type: 'GET_SPOTIFY_ACCESS_TOKEN_REQUEST',
        spotifyId,
    }),
    success: ({ accessToken }) => ({
        type: 'GET_SPOTIFY_ACCESS_TOKEN_SUCCESSFUL',
        accessToken,
    }),
    failure: ({ message }) => ({
        type: 'GET_SPOTIFY_ACCESS_TOKEN_FAILED',
        message,
    }),
};

const saveSpotifyAccessToken = ({ accessToken }) => ({ type: 'SAVE_ACCESS_TOKEN', accessToken });

const loginToSpotify = () => ({ type: 'LOGIN_TO_SPOTIFY' });

const action = {
    getSpotifyAccessToken,
    loginToSpotify,
    saveSpotifyAccessToken,
};

export default action;
