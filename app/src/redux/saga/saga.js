import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

import { SPOTIFY_URL } from '../../resources/constants';
import { ActionTypes } from '../constants/actionTypes';
import actions from '../actions/initializationActions';

const api = ({ url, payload }) => {
    return axios.get(url, { params: payload });
};

function* fetchAccessToken(action) {
    try {
        const { data } = yield call(api, {
            url: SPOTIFY_URL.ACCESS_TOKEN,
            payload: { spotify_id: action.spotifyId },
        });
        yield put(actions.getAccessToken.success({ accessToken: data.access_token }));
    } catch (_) {
        yield put(actions.getAccessToken.failure({ error: 'Could not retrieve access token' }));
    }
}

function* listeners() {
    yield takeEvery(ActionTypes.GET_ACCESS_TOKEN.REQUEST, fetchAccessToken);
}

export default listeners;
