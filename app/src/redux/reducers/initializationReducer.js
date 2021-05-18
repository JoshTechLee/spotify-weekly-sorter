import { ActionTypes } from '../constants/actionTypes';

const initialState = {
    accessToken: '',
    spotifyId: '',
};
export const initializationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ACCESS_TOKEN.SUCCESS:
            return { ...state, accessToken: action.accessToken };
        case ActionTypes.GET_USER_DATA.SUCCESS:
            return { ...state, spotifyId: action.spotifyId };
        default:
            return state;
    }
};
