const getAccessToken = (payload) => ({ type: 'GET_ACCESS_TOKEN', payload });
const loginToSpotify = () => ({ type: 'LOGIN_TO_SPOTIFY' });

const action = {
    getAccessToken,
    loginToSpotify,
};

export default action;
