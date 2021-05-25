import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import * as requests from '../../resources/requests';
import * as parser from '../../resources/parser';
import { ActionTypes } from '../../resources/constants';
import { getAccessToken } from '../actions/initializationActions';
import { getCurrentPlaylistSongs, getUserPlaylists } from '../actions/playlistActions';

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
        console.log(areMorePlaylists);
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

function* fetchPlaylistSongs(action) {
    try {
        const accessToken = yield select((state) => state.accessToken.code);
        const { data } = yield call(requests.fetchPlaylist, {
            // playlistId: action.payload.playlistId,
            playlistId: '37i9dQZEVXcUucvBO9dizK',
            accessToken,
        });
        console.log(data);
        const { songs } = parser.parsePlaylistToSongs({ data });
        yield put(getCurrentPlaylistSongs.success({ songs }));
    } catch (err) {
        console.log(err.response);
        console.log(err.response.data.error);
        yield refreshAccessTokenAndRetry(err, () => fetchUserPlaylists(action));
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
    yield takeEvery(ActionTypes.GET_ACCESS_TOKEN.REQUEST, fetchAccessToken);
    yield takeLatest(ActionTypes.GET_USER_PLAYLISTS.REQUEST, fetchUserPlaylists);
    yield takeLatest(ActionTypes.GET_CURRENT_PLAYLIST_SONGS.REQUEST, fetchPlaylistSongs);
}

export default listeners;
