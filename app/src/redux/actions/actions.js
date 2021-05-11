const getSpotifyAccessToken = (payload) => ({ type: 'GET_ACCESS_TOKEN', payload });
const saveAccessToken = (payload) => ({ type: 'SAVE_ACCESS_TOKEN', payload });

const loginToSpotify = () => ({ type: 'LOGIN_TO_SPOTIFY' });

const action = {
    getSpotifyAccessToken,
    loginToSpotify,
    saveAccessToken,
};

export default action;
