const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');

const { SPOTIFY_AUTHORIZATION_URL } = require('../../helpers/constants');
const { getSpotifyUserProfile, getSpotifyRefreshToken } = require('../../helpers/requests');

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
router.get('/callback', (req, res) => {
    const code = req.query.code || null;
    getSpotifyRefreshToken({ code }, ({ data }) => {
        const { access_token, refresh_token } = data;
        getSpotifyUserProfile({ access_token }, ({ data }) => {
            console.log('high ho ding ding');
            console.log(data);
            const user_model_data = {
                _id: data.uri,
                refresh_token,
                is_premium: data.product == 'premium',
            };

            User.findByIdAndUpdate(data.uri, user_model_data, { upsert: true }, () => {
                console.log('save successful');
            });
            res.redirect(
                process.env.CLIENT_URI +
                    '?' +
                    querystring.stringify({
                        user_data: data,
                        access_token,
                    })
            );
        });
    });
});

module.exports = router;
