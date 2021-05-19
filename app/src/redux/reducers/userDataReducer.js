import { ActionTypes } from '../constants/actionTypes';

const initialState = {
    accessToken: '',
    spotifyId: '',
    displayName: '',
    image: '',
    isPremium: false,
};
export const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_FIRST_ACCESS_TOKEN.SUCCESS:
            console.log(action);
            return { ...state, accessToken: action.accessToken };
        case ActionTypes.GET_FIRST_USER_DATA.SUCCESS:
            return { ...state, ...action.userData };
        default:
            return state;
    }
};
