import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

import { SPOTIFY_URL } from '../../resources/constants';
import actions from '../../redux/actions/actions';

const api = ({ url, payload }) => {
    return axios.get(url, { params: payload });
};

function* fetchSpotifyAccessToken(action) {
    try {
        const accessToken = yield call(api, {
            url: SPOTIFY_URL.ACCESS_TOKEN,
            payload: { spotify_id: action.spotifyId },
        });
        yield put(actions.getSpotifyAccessToken.success({ accessToken }));
    } catch (err) {
        yield put(actions.getSpotifyAccessToken.failure({ message: err.message }));
    }
}

function* mySaga() {
    yield takeEvery('GET_SPOTIFY_ACCESS_TOKEN_REQUEST', fetchSpotifyAccessToken);
}

export default mySaga;
