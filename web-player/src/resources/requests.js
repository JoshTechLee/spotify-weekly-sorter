import axios from 'axios';

const ACCESS_TOKEN_URL = 'http://localhost:22519/spotify/token';
const SPOTIFY_BASE_ME_URL = 'https://api.spotify.com/v1/me/';

const spotifyGetConfig = ({ accessToken, params, body }) => ({
    params: { ...params },
    data: { ...body },
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
    },
});

export const fetchAccessToken = ({ spotifyId }) =>
    axios.get(ACCESS_TOKEN_URL, { params: { spotify_id: spotifyId } });

export const startRemoteSDK = ({ deviceId, accessToken }) => {
    return axios.put(
        SPOTIFY_BASE_ME_URL + 'player/play',
        {
            context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
            offset: {
                position: 5,
            },
            position_ms: 0,
        },
        spotifyGetConfig({
            params: { device_id: deviceId },
            accessToken,
        })
    );
};
