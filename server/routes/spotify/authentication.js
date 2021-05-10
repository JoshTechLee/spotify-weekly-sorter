const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');

const { SPOTIFY_AUTHORIZATION_URL } = require('../../helpers/constants');
const { getSpotifyUserProfile, getSpotifyRefreshToken } = require('../../helpers/requests');

const User = require('../../model/user');

router.get('/login', (req, res) => {
    res.redirect(
        SPOTIFY_AUTHORIZATION_URL +
            '?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: 'user-read-private user-read-email',
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
            console.log(data);
            const { _id } = { _id: data.uri };
            const user_model_data = { _id, refresh_token, is_premium };

            User.findByIdAndUpdate(_id, user_model_data, { upsert: true }, () => {
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
});

module.exports = router;
