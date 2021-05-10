const axios = require('axios');
const querystring = require('querystring');

const { SPOTIFY_API_URL, SPOTIFY_TOKEN_URL, SPOTIFY_AUTHORIZATION_STRING } = require('./constants');

exports.getSpotifyUserProfile = async ({ access_token }, callback) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
    };
    return await axios
        .get(SPOTIFY_API_URL.user_profile, { headers })
        .then(callback)
        .catch((err) => {
            console.log('ERROR: getSpotifyUserProfile');
            console.log(err.data);
        });
};

exports.getSpotifyAccessToken = async ({ refresh_token }, callback) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
    });
    return await axios
        .post(SPOTIFY_API_URL, params, { headers })
        .then(callback)
        .catch((err) => {
            console.log('ERROR: getSpotifyAccessToken');
            console.log(err.data);
        });
};

exports.getSpotifyRefreshToken = async ({ code }, callback) => {
    const params = querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SERVER_URI,
    });
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: SPOTIFY_AUTHORIZATION_STRING,
    };
    return await axios
        .post(SPOTIFY_TOKEN_URL, params, { headers })
        .then(callback)
        .catch((err) => {
            console.log('ERROR: getSpotifyRefreshToken');
            console.log(err.data);
        });
};
