const express = require('express');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');

const app = express();

const redirect_uri = process.env.SERVER_URI;
const client_uri = process.env.CLIENT_URI;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

router.get('/login', (req, res) => {
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id,
                scope: 'user-read-private user-read-email',
                redirect_uri,
            })
    );
});

router.get('/callback', function (req, res) {
    const code = req.query.code || null;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
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
        console.log(body);
        const access_token = body.access_token;
        res.redirect(client_uri + '?access_token=' + access_token);
    });
});

module.exports = router;
