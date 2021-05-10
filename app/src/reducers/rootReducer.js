import { FETCH_SPOTIFY_USER_DATA, CHECK_IF_LOGGED_IN } from '../resources/constants';

const intialState = {
    isLoading: true,
};

function rootReducer(state = intialState, action) {
    switch (action.type) {
        case FETCH_SPOTIFY_USER_DATA.REQUEST:
            return { isLoading: true };
        default:
            return state;
    }
}

export default rootReducer;
