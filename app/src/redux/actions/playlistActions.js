import { ActionTypes } from '../../resources/constants';

// User Playlists
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

// Current Playlist Songs
export const setCurrentPlaylistSongs = {
    clear: () => ({
        type: ActionTypes.SET_CURRENT_PLAYLIST_SONGS.CLEAR,
    }),
    fresh: (payload) => ({
        type: ActionTypes.SET_CURRENT_PLAYLIST_SONGS.FRESH,
        payload,
    }),
};
export const setPlaylistSearch = {
    filter: (payload) => ({
        type: ActionTypes.SET_PLAYLIST_SEARCH.FILTER,
        payload,
    }),
    clear: () => ({
        type: ActionTypes.SET_PLAYLIST_SEARCH.CLEAR,
    }),
};

// // Clear User Playlists
// export const clearUserPlaylists = {
//     type: ActionTypes.CLEAR_USER_PLAYLISTS,
// };
