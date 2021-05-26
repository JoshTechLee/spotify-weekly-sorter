import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import * as requests from '../../resources/requests';
import * as parser from '../../resources/parser';
import { ActionTypes } from '../../resources/constants';
import { getAccessToken } from '../actions/initializationActions';
import {
    getCurrentPlaylistSongs,
    setCurrentPlaylistSongs,
    getUserPlaylists,
} from '../actions/playlistActions';

const commonActions = {
    fetch: 'fetch',
    request: 'request',
    success: 'success',
    failure: 'failure',
    clear: 'clear',
};

function* fetchUserPlaylists(action) {
    try {
        var { accessToken, uri, areMorePlaylists, userPlaylists, otherPlaylists, offset } =
            yield select((state) => ({
                accessToken: state.accessToken.code,
                uri: state.userData.spotifyId,
                areMorePlaylists: state.playlists.areMorePlaylists,
                userPlaylists: [],
                otherPlaylists: [],
                offset: 0,
            }));
        while (areMorePlaylists) {
            const { data } = yield call(requests.fetchUserPlaylists, { offset, accessToken });
            ({ userPlaylists, otherPlaylists, areMorePlaylists } = parser.parseUserPlaylists({
                userPlaylists,
                otherPlaylists,
                uri,
                data,
            }));

            offset += 50;
        }
        yield put(getUserPlaylists.success({ otherPlaylists, userPlaylists, areMorePlaylists }));
    } catch (err) {
        console.log(err.response.data.error);
        yield refreshAccessTokenAndRetry(err, () => fetchUserPlaylists(action));
    }
}

function* fetchCurrentPlaylistSongs(action) {
    try {
        const accessToken = yield select((state) => state.accessToken.code);
        const { data } = yield call(requests.fetchPlaylist, {
            // playlistId: action.payload.playlistId,
            playlistId: '37i9dQZEVXcUucvBO9dizK',
            accessToken,
        });
        const songs = parser.parsePlaylistToSongs({ data });
        yield put(getCurrentPlaylistSongs.success({ songs }));
    } catch (err) {
        // try all options to resolve error status
        console.log('[fetchCurrentPlaylistSongs] catch block');
        try {
            yield refreshAccessTokenAndRetry(err, () => fetchUserPlaylists(action));
        } catch {
            console.log('oh fuck');
        }
    }
}

function* fetchAccessToken(action) {
    try {
        const { data } = yield call(requests.fetchAccessToken, { spotifyId: action.spotifyId });
        yield put(getAccessToken.success({ accessToken: data.access_token }));
    } catch (err) {
        yield put(getAccessToken.failure({ error: 'Could not retrieve access token' }));
    }
}

function* refreshAccessTokenAndRetry(err, lastRequest) {
    console.log('[refreshAccessTokenAndRetry]  error message data');
    console.log(err.response);
    try {
        const { status, message } = {
            status: err.response.data.error.status,
            message: err.response.data.error.message,
        };
        if (status === 401 && message === 'The access token expired') {
            const fetchLimitReached = yield select((state) => state.accessToken.fetchLimitReached);
            yield put(getAccessToken.failure({ error: 'Could not retrieve access token' }));
            if (!fetchLimitReached) {
                const spotifyId = yield select((state) => state.userData.spotifyId);
                yield fetchAccessToken({ spotifyId });
                yield lastRequest();
            }
        }
    } catch (err) {
        console.log(err);
        console.log('oh fuck');
    }
}

function* listeners() {
    yield takeEvery(ActionTypes.GET_ACCESS_TOKEN.REQUEST, fetchAccessToken('commonActions'));
    yield takeLatest(ActionTypes.GET_USER_PLAYLISTS.REQUEST, fetchUserPlaylists);
    yield takeLatest(ActionTypes.GET_CURRENT_PLAYLIST_SONGS.REQUEST, fetchCurrentPlaylistSongs);
}

export default listeners;
