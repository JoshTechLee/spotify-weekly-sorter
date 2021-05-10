const express = require('express');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');

const { SPOTIFY_AUTHORIZATION_URL, SPOTIFY_TOKEN_URL } = require('../../helpers/constants');
const User = require('../../model/user');
const { getSpotifyUserProfile } = require('./user');

const redirect_uri = process.env.SERVER_URI;
const client_uri = process.env.CLIENT_URI;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

router.get('/login', (req, res) => {
    res.redirect(
        SPOTIFY_AUTHORIZATION_URL +
            '?' +
            querystring.stringify({
                response_type: 'code',
                client_id,
                scope: 'user-read-private user-read-email',
                redirect_uri,
            })
    );
});

router.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const authOptions = {
        url: SPOTIFY_TOKEN_URL,
        form: {
            code,
            redirect_uri,
            grant_type: 'authorization_code',
        },
        headers: {
            Authorization:
                'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        },
        json: true,
    };
    request.post(authOptions, (error, response, body) => {
        const { access_token, refresh_token, is_premium } = {
            access_token: body.access_token,
            refresh_token: body.refresh_token,
            is_premium: body.premium == 'premium',
        };

        getSpotifyUserProfile({ access_token }).then((data) => {
            const { _id } = { _id: data.uri };
            const user = new User({ _id, refresh_token, is_premium });

            // User.findOneAndUpdate(_id, user, { upsert: true });
            user.save((_id, user) => {
                console.log('saved');
            });

            res.redirect(
                client_uri +
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
