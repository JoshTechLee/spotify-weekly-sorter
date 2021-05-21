import { ActionTypes } from '../../resources/constants';

const initialState = {
    userPlaylists: [],
    otherPlaylists: [],
    areMorePlaylists: true,
};
export const playlistsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_USER_PLAYLISTS.SUCCESS:
            console.log(state);
            return initialState;
            return {
                userPlaylists: [...state.userPlaylists, ...payload.userPlaylists],
                otherPlaylists: [...state.otherPlaylists, ...payload.otherPlaylists],
                areMorePlaylists: payload.areMorePlaylists,
            };
        default:
            return state;
    }
};
