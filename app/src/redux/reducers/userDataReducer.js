import { ActionTypes } from '../../resources/constants';

const initialState = {
    spotifyId: '',
    displayName: '',
    image: '',
    isPremium: false,
};
export const userDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_USER_DATA.SUCCESS:
            return { ...state, ...payload.userData };
        default:
            return state;
    }
};
