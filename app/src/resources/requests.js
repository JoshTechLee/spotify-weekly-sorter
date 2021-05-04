const codeChallenge = require('./helper').codeChallenge;
const axios = require('axios');

export const spotifyAuthorization = ({ code }) => {
    return axios.get('https://accounts.spotify.com/authorize', {
        params: {
            client_id: 'c419c7f3c20744ebac6f7ac1e019cdee',
            response_type: 'code',
            redirect_uri: 'http://localhost/callback/',
            code_challenge_method: 'S256',
            code_challenge: codeChallenge(code),
        },
    });
};
