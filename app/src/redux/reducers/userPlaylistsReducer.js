import { ActionTypes } from '../../resources/constants';

const initialState = {
    total: 0,
    playlists: [],
};
export const userPlaylistsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_USER_PLAYLISTS.SUCCESS:
            console.log(payload);
            return state;

        // return {
        //     ...state,
        //     playlists: [...state.playlists, ...payload.playlists],
        //     total: payload.total,
        // };
        default:
            return state;
    }
};
