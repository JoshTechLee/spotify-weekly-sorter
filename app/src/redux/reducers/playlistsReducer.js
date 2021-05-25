import { ActionTypes } from '../../resources/constants';

const initialState = {
    playlistFilter: '',
    visiblePlaylists: [],
    userPlaylists: [],
    otherPlaylists: [],
    areMorePlaylists: true,
};
export const playlistsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_USER_PLAYLISTS.SUCCESS:
            return {
                userPlaylists: [...state.userPlaylists, ...payload.userPlaylists],
                otherPlaylists: [...state.otherPlaylists, ...payload.otherPlaylists],
                areMorePlaylists: payload.areMorePlaylists,
            };
        default:
            return state;
    }
};
