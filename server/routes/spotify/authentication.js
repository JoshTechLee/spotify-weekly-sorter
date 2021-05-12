const express = require('express');
const router = express.Router();
const querystring = require('querystring');

const { SPOTIFY_AUTHORIZATION_URL } = require('../../helpers/constants');
const { getSpotifyRefreshToken, getSpotifyAccessToken } = require('../../helpers/requests/tokens');
const { getSpotifyUserProfile } = require('../../helpers/requests/api');
const User = require('../../model/user');

const spotify_scope = 'user-read-private user-read-email playlist-read-private';

router.get('/login', (_, res) => {
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

router.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const { access_token, refresh_token } = await getSpotifyRefreshToken({ code }, ({ data }) => {
        return { access_token: data.access_token, refresh_token: data.refresh_token };
    });
    const user = await getSpotifyUserProfile({ access_token }, ({ data }) => {
        const new_user = {
            id: data.uri,
            display_name: data.display_name,
            is_premium: data.product == 'premium',
            image: data.images[0].url,
        };
        return new_user;
    });
    User.findByIdAndUpdate(
        user.id,
        { _id: user.id, refresh_token, is_premium: user.is_premium },
        { upsert: true }
    );
    res.redirect(
        process.env.CLIENT_URI +
            '?' +
            querystring.stringify({
                user,
                access_token,
            })
    );
});

router.get('/token', async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    // const spotify_id = req.body.spotify_id;
    // const refresh_token = await User.findById(spotify_id, 'refresh_token')
    //     .limit(1)
    //     .then((data) => {
    //         return data.refresh_token;
    //     });
    // const { access_token } = await getSpotifyAccessToken({ refresh_token }, ({ data }) => {
    //     return { access_token: data.access_token };
    // });
    // res.send({ access_token });
    res.send(req.body);
});

module.exports = router;
