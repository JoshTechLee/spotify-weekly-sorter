import { ActionTypes } from '../../resources/constants';

const FETCH_ATTEMPT_LIMIT = 3;

const initialState = {
    code: '',
    fetchAttempts: 0,
    fetchLimitReached: false,
};

export const accessTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ACCESS_TOKEN.FAILURE:
            console.log('what what we reaching here what what');
            console.log(state.fetchAttempts, FETCH_ATTEMPT_LIMIT);
            const fetchLimitReached = state.fetchAttempts >= FETCH_ATTEMPT_LIMIT;
            console.log(fetchLimitReached);
            return {
                ...state,
                fetchAttempts: fetchLimitReached ? 0 : state.fetchAttempts + 1,
                fetchLimitReached,
            };
        case ActionTypes.GET_ACCESS_TOKEN.SUCCESS:
            return {
                ...state,
                code: action.accessToken,
                fetchAttempts: 0,
                fetchLimitReached: false,
            };
        default:
            return state;
    }
};
