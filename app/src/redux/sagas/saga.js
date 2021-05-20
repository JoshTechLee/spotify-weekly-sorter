import { call, put, take, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { SERVER_URL } from '../../resources/constants';
import { ActionTypes } from '../constants/actionTypes';
import { getAccessToken } from '../actions/initializationActions';

const api = ({ url, accessToken }) => {
    console.log(url);
    console.log(accessToken);
    let config = {
        params: { limit: 50, offset: 0 },
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        },
    };
    return axios.get('https://api.spotify.com/v1/me/playlists', config);
};
// const

const spotifyHeaders = (accessToken) => ({
    Accept: 'application/json',
    Authorization: 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
});

function* fetchAccessToken(action) {
    try {
        const { data } = yield call(api, {
            url: SERVER_URL.ACCESS_TOKEN,
            payload: { params: { spotify_id: action.spotifyId } },
        });
        yield put(getAccessToken.success({ accessToken: data.access_token }));
    } catch (_) {
        yield put(getAccessToken.failure({ error: 'Could not retrieve access token' }));
    }
}

function* fetchUserPlaylists(action) {
    try {
        const accessToken = yield select((state) => state.userData.accessToken);
        const { data } = yield call(api, {
            url: 'https://api.spotify.com/v1/me/playlists',
            accessToken,
        });
    } catch (err) {
        yield refreshAccessTokenAndRetry(err, () => fetchUserPlaylists(action));
    }
}

function* refreshAccessTokenAndRetry(err, lastRequest) {
    try {
        const { status, message } = {
            status: err.response.data.error.status,
            message: err.response.data.error.message,
        };
        if (status == 401 && message == 'The access token expired') {
            console.log('we here now boys woot woot in the boot');
            // yield fetchAccessToken();
            // yield lastRequest();
        }
    } catch (_) {
        console.log('oh fuck');
    }
}

function* listeners() {
    yield takeLatest(ActionTypes.GET_ACCESS_TOKEN.REQUEST, fetchAccessToken);
    yield takeEvery(ActionTypes.GET_USER_PLAYLISTS.REQUEST, fetchUserPlaylists);
}

export default listeners;
