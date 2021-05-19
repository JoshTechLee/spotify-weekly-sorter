import { ActionTypes } from '../constants/actionTypes';

const getFirstAccessToken = {
    request: ({ spotifyId }) => ({
        type: ActionTypes.GET_FIRST_ACCESS_TOKEN.REQUEST,
        spotifyId,
    }),
    success: ({ accessToken }) => ({
        type: ActionTypes.GET_FIRST_ACCESS_TOKEN.SUCCESS,
        accessToken,
    }),
    failure: ({ message }) => ({
        type: ActionTypes.GET_FIRST_ACCESS_TOKEN.FAILURE,
        message,
    }),
};

const getFirstUserData = {
    request: () => ({
        type: ActionTypes.GET_FIRST_USER_DATA.REQUEST,
    }),
    success: ({ userData }) => ({
        type: ActionTypes.GET_FIRST_USER_DATA.SUCCESS,
        userData,
    }),
    failure: ({ message }) => ({
        type: ActionTypes.GET_FIRST_USER_DATA.FAILURE,
        message,
    }),
};

const action = {
    getFirstAccessToken,
    getFirstUserData,
};

export default action;
