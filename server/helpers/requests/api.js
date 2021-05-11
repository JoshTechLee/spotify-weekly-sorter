const axios = require('axios');

const { SPOTIFY_API_URL } = require('../constants');

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
            console.log(err);
        });
};
