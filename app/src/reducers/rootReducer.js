import { FETCH_SPOTIFY_USER_DATA, CHECK_IF_LOGGED_IN } from '../resources/constants';

const intialState = {
    isLoading: true,
};

function rootReducer(state = intialState, action) {
    switch (action.type) {
        case FETCH_SPOTIFY_USER_DATA.REQUEST:
            return { isLoading: true };

        case FETCH_:
            return { counter: state.counter - 1 };

        default:
            return state;
    }
}

export default rootReducer;
