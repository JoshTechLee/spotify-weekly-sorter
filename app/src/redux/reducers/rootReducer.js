import { FETCH_SPOTIFY_USER_DATA } from '../../resources/constants';

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

const loginState = {
    isServerUp: false,
    hasAccessToken: false,
    isError: false,
    isLoading: true,
};

// function loginReducer(state = initialState, action) {
//     switch (action.type) {
//         case IS_LOADING
//     }
// }

export default rootReducer;
