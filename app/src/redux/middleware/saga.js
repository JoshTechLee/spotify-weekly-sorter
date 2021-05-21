import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import * as requests from '../../resources/requests';
import { ActionTypes } from '../../resources/constants';
import { getAccessToken } from '../actions/initializationActions';

function* fetchAccessToken(action) {
    try {
        const { data } = yield call(requests.fetchAccessToken, { spotifyId: action.spotifyId });
        yield put(getAccessToken.success({ accessToken: data.access_token }));
        console.log(data);
    } catch (err) {
        console.log(err.response);
        yield put(getAccessToken.failure({ error: 'Could not retrieve access token' }));
    }
}

function* fetchUserPlaylists(action) {
    try {
        const accessToken = yield select((state) => state.accessToken.code);
        console.log(accessToken);
        // TODO: set the offset mcbobber majiggy cause it's defaulted to 0
        const { data } = yield call(requests.fetchUserPlaylists, { offset: 0, accessToken });
        // yield put(getUserPlaylists.success({playlists: }))
        console.log(data);
    } catch (err) {
        console.log(err.response.data.error);
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
            const fetchLimitReached = yield select((state) => state.accessToken.fetchLimitReached);
            const fetchAttempts = yield select((state) => state.accessToken.fetchAttempts);

            console.log(fetchLimitReached);
            console.log(fetchAttempts);
            // if (!fetchLimitReached) {
            //     yield fetchAccessToken();
            //     yield lastRequest();
            // }
        }
    } catch (_) {
        console.log('oh fuck');
    }
}

function* listeners() {
    yield takeEvery(ActionTypes.GET_ACCESS_TOKEN.REQUEST, fetchAccessToken);
    yield takeLatest(ActionTypes.GET_USER_PLAYLISTS.REQUEST, fetchUserPlaylists);
}

export default listeners;
