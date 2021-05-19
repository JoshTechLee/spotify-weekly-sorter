import { call, put, take, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

import { SPOTIFY_URL } from '../../resources/constants';
import { ActionTypes } from '../constants/actionTypes';
import actions from '../actions/initializationActions';

const serverApi = ({ url, payload }) => {
    return axios.get(url, { params: payload });
};

function* fetchFirstAccessToken(action) {
    try {
        const { data } = yield call(serverApi, {
            url: SPOTIFY_URL.ACCESS_TOKEN,
            payload: { spotify_id: action.spotifyId },
        });
        yield put(actions.getFirstAccessToken.success({ accessToken: data.access_token }));
    } catch (_) {
        yield put(
            actions.getFirstAccessToken.failure({ error: 'Could not retrieve access token' })
        );
    }
    try {
    } catch (_) {
        yield put(
            actions.getFirstPlaylists.failure({
                error: 'Could not retrieve playlists from Spotify',
            })
        );
    }
}

function* listeners() {
    yield take(ActionTypes.GET_FIRST_ACCESS_TOKEN.REQUEST, fetchFirstAccessToken);
}

export default listeners;
