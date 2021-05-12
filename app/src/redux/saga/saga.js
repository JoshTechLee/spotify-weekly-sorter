import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

import { SPOTIFY_URL } from '../../resources/constants';
import actions from '../../redux/actions/actions';

const headers = { 'Content-Type': 'application/json' };

const api = ({ url, payload }) => {
    return axios.get(url, { params: payload }, { headers });
};

function* fetchSpotifyAccessToken(action) {
    console.log('we reaching here boys');
    console.log(action.spotifyId);
    try {
        const accessToken = yield call(api, {
            url: SPOTIFY_URL.ACCESS_TOKEN,
            payload: { spotify_id: action.spotifyId },
        });
        console.log('but do we reach here?');
        console.log(accessToken);
        yield put(actions.getSpotifyAccessToken.success({ accessToken }));
    } catch (err) {
        console.log('we got an error yo');
        console.log(err.message);
        yield put(actions.getSpotifyAccessToken.failure({ message: err.message }));
    }
}

function* mySaga() {
    yield takeEvery('GET_SPOTIFY_ACCESS_TOKEN_REQUEST', fetchSpotifyAccessToken);
}

export default mySaga;
