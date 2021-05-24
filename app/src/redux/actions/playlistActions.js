import { ActionTypes } from '../../resources/constants';

export const getUserPlaylists = {
    request: () => ({
        type: ActionTypes.GET_USER_PLAYLISTS.REQUEST,
    }),
    success: (payload) => ({
        type: ActionTypes.GET_USER_PLAYLISTS.SUCCESS,
        payload,
    }),
    failure: (payload) => ({
        type: ActionTypes.GET_USER_PLAYLISTS.FAILURE,
        payload,
    }),
};

export const getCurrentPlaylistSongs = {
    request: () => ({
        type: ActionTypes.GET_CURRENT_PLAYLIST_SONGS.REQUEST,
    }),
    success: (payload) => ({
        type: ActionTypes.GET_CURRENT_PLAYLIST_SONGS.SUCCESS,
        payload,
    }),
    failure: (payload) => ({
        type: ActionTypes.GET_CURRENT_PLAYLIST_SONGS.FAILURE,
        payload,
    }),
};

export const clearUserPlaylists = {
    type: ActionTypes.CLEAR_USER_PLAYLISTS,
};
