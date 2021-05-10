const express = require('express');
const axios = require('axios');
const request = require('request');
const querystring = require('querystring');

const { SPOTIFY_API_URL } = require('../../helpers/constants');

exports.getSpotifyUserProfile = async ({ access_token }) => {
    const user = await axios
        .get(SPOTIFY_API_URL.user_profile, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token,
            },
        })
        .then(({ data }) => {
            console.log('hey hey hey we is here dawg');
            return data;
        })
        .catch((err) => {
            console.log(err.data);
        });
    return user;
};
