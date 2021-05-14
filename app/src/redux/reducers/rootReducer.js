import {
    GET_SPOTIFY_ACCESS_TOKEN,
    GET_SPOTIFY_USER_DATA,
    RUN_THROUGH_CHECKLIST,
} from '../../resources/constants';

const intialState = {
    loadingMessage: 'Working...',
    accessToken: '',
    spotifyId: '',
    errors: [],
    hasPassedChecklist: false,
};

function rootReducer(state = intialState, action) {
    switch (action.type) {
        case GET_SPOTIFY_ACCESS_TOKEN.REQUEST:
            return { ...state, loadingMessage: 'Getting access token...' };
        case GET_SPOTIFY_ACCESS_TOKEN.SUCCESS:
            return { ...state, accessToken: action.accessToken };
        case GET_SPOTIFY_ACCESS_TOKEN.FAILURE:
            return { ...state, errors: [...state.errors, 'Could not retrieve access token'] };
        case GET_SPOTIFY_USER_DATA.REQUEST:
            return { ...state, loadingMessage: 'Getting user data' };
        case GET_SPOTIFY_USER_DATA.SUCCESS:
            return { ...state, spotifyId: action.spotifyId };
        case GET_SPOTIFY_USER_DATA.FAILURE:
            return { ...state, errors: [...state.errors, 'Could not retrieve user data'] };
        case RUN_THROUGH_CHECKLIST: {
            if (!!state.accessToken && !!state.spotifyId)
                return { ...state, hasPassedChecklist: true };

            return { ...state, hasPassedChecklist: false };
        }
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
