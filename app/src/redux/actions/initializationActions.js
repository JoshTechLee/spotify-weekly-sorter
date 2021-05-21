import { ActionTypes } from '../../resources/constants';

export const getAccessToken = {
    request: ({ spotifyId }) => ({
        type: ActionTypes.GET_ACCESS_TOKEN.REQUEST,
        spotifyId,
    }),
    success: ({ accessToken }) => ({
        type: ActionTypes.GET_ACCESS_TOKEN.SUCCESS,
        accessToken,
    }),
    failure: ({ message }) => ({
        type: ActionTypes.GET_ACCESS_TOKEN.FAILURE,
        message,
    }),
};

export const getUserData = {
    request: () => ({
        type: ActionTypes.GET_USER_DATA.REQUEST,
    }),
    success: ({ userData }) => ({
        type: ActionTypes.GET_USER_DATA.SUCCESS,
        userData,
    }),
    failure: ({ message }) => ({
        type: ActionTypes.GET_USER_DATA.FAILURE,
        message,
    }),
};
