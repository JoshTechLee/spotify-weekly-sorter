require('dotenv').config();
const express = require('express');
const request = require('request');
const querystring = require('querystring');

const app = express();

const redirect_uri = process.env.SERVER_URI;
const port = process.env.PORT;

app.get('/login', (req, res) => {
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: 'user-read-private user-read-email',
                redirect_uri,
            })
    );
});

app.get('/callback', function (req, res) {
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
                'Basic ' +
                (process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString(
                    'base64'
                ),
        },
        json: true,
    };
    request.post(authOptions, (error, response, body) => {
        const access_token = body.access_token;
        const uri = process.env.CLIENT_URI || 'http://localhost:3000';
        res.redirect(uri + '?access_token=' + access_token);
    });
});

console.log('running on port' + port);
app.listen(port);
