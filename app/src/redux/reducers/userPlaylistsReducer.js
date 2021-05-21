import { ActionTypes } from '../../resources/constants';

const initialState = {
    total: 0,
    playlists: [],
};
export const userPlaylistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_DATA.SUCCESS:
            return { ...state, ...action.userData };
        default:
            return state;
    }
};
