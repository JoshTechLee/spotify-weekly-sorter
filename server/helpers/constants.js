const SPOTIFY_URL_PREFIX = 'https://api.spotify.com/v1/';
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

exports.SPOTIFY_AUTHORIZATION_URL = 'https://accounts.spotify.com/authorize';
exports.SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
exports.SPOTIFY_AUTHORIZATION_STRING =
    'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64');

exports.SPOTIFY_API_URL = {
    user_profile: SPOTIFY_URL_PREFIX + 'me',
};
