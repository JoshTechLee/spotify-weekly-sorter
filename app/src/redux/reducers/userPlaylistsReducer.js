import { ActionTypes } from '../constants/actionTypes';

const initialState = {
    accessToken: '',
    spotifyId: '',
    displayName: '',
    image: '',
    isPremium: false,
};
export const userPlaylistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_PLAYLISTS.REQUEST:
            console.log('WELL WELL WEL');
            return {};
        case ActionTypes.GET_USER_DATA.SUCCESS:
            return { ...state, ...action.userData };
        default:
            return state;
    }
};
