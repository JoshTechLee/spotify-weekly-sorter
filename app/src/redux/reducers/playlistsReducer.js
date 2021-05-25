import { ActionTypes } from '../../resources/constants';

const initialState = {
    search: '',
    userPlaylists: [],
    otherPlaylists: [],
    areMorePlaylists: true,
};
export const playlistsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_USER_PLAYLISTS.SUCCESS:
            return {
                ...state,
                userPlaylists: [...state.userPlaylists, ...payload.userPlaylists],
                otherPlaylists: [...state.otherPlaylists, ...payload.otherPlaylists],
                areMorePlaylists: payload.areMorePlaylists,
            };
        case ActionTypes.SET_PLAYLIST_SEARCH.FILTER: {
            return {
                ...state,
                search: payload.search,
            };
        }
        default:
            return state;
    }
};
