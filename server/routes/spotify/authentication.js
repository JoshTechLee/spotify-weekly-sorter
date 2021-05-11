const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');

const { SPOTIFY_AUTHORIZATION_URL } = require('../../helpers/constants');
const { getSpotifyRefreshToken, getSpotifyAccessToken } = require('../../helpers/requests/tokens');
const { getSpotifyUserProfile } = require('../../helpers/requests/api');

const User = require('../../model/user');
const spotify_scope =
    'user-read-private user-read-email playlist-read-private playlist-read-collaborative';
// const spotify_scope = 'user-read-private user-read-email user-library-modify';

router.get('/login', (req, res) => {
    res.redirect(
        SPOTIFY_AUTHORIZATION_URL +
            '?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: spotify_scope,
                redirect_uri: process.env.SERVER_URI,
            })
    );
});

//
router.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const { access_token, refresh_token } = await getSpotifyRefreshToken({ code }, ({ data }) => {
        return { access_token: data.access_token, refresh_token: data.refresh_token };
    });
    const { _id, is_premium } = await getSpotifyUserProfile({ access_token }, ({ data }) => {
        console.log('high ho ding ding');
        console.log(data);
        return { _id: data.uri, is_premium: data.product == 'premium' };
    });
    User.findByIdAndUpdate(_id, { _id, refresh_token, is_premium }, { upsert: true }, () => {
        console.log('save successful');
    });
    res.redirect(
        process.env.CLIENT_URI +
            '?' +
            querystring.stringify({
                // user_data: data,
                access_token,
            })
    );
});

router.get('/token', async (req, res) => {
    const spotify_id = req.body.spotify_id;
    const refresh_token = await User.findById(spotify_id, 'refresh_token')
        .limit(1)
        .then((data) => {
            return data.refresh_token;
        });
    // console.log(refresh_token);
    getSpotifyAccessToken({ refresh_token }, (data) => {
        res.send(refresh_token);
    });
});

module.exports = router;
