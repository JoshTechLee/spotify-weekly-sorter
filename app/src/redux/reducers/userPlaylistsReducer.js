import { ActionTypes } from '../../resources/constants';

const initialState = {
    total: 0,
    playlists: [],
    areMorePlaylists: false,
};
export const userPlaylistsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_USER_PLAYLISTS.SUCCESS:
            return {
                ...state,
                playlists: [...state.playlists, ...payload.playlists],
                total: payload.total,
                areMorePlaylists: payload.areMorePlaylists,
            };
        default:
            return state;
    }
};
