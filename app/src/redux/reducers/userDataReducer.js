import { ActionTypes } from '../../resources/constants';

const initialState = {
    spotifyId: '',
    displayName: '',
    image: '',
    isPremium: false,
};
export const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_DATA.SUCCESS:
            return { ...state, ...action.userData };
        default:
            return state;
    }
};
