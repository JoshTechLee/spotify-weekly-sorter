const axios = require('axios');
const querystring = require('querystring');

const { SPOTIFY_TOKEN_URL, SPOTIFY_AUTHORIZATION_STRING } = require('../constants');

// common header for refresh + access token
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: SPOTIFY_AUTHORIZATION_STRING,
};

exports.getSpotifyRefreshToken = async ({ code }, callback) => {
    const params = querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SERVER_URI,
    });
    return await axios
        .post(SPOTIFY_TOKEN_URL, params, { headers })
        .then(callback)
        .catch((err) => {
            console.log('ERROR: getSpotifyRefreshToken');
            console.log(err.response.data);
        });
};

exports.getSpotifyAccessToken = async ({ refresh_token }, callback) => {
    const params = querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
    });
    return await axios
        .post(SPOTIFY_TOKEN_URL, params, { headers })
        .then(callback)
        .catch((err) => {
            console.log('ERROR: getSpotifyAccessToken');
            console.log(err.response.data);
        });
};
