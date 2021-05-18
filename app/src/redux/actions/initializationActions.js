import { ActionTypes } from '../constants/actionTypes';

const getAccessToken = {
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

const getUserData = {
    request: () => ({
        type: ActionTypes.GET_USER_DATA.REQUEST,
    }),
    success: ({ spotifyId }) => ({
        type: ActionTypes.GET_USER_DATA.SUCCESS,
        spotifyId,
    }),
    failure: ({ message }) => ({
        type: ActionTypes.GET_USER_DATA.FAILURE,
        message,
    }),
};

const saveUserData = ({ userData }) => ({ type: 'SAVE_USER_DATA', userData });

const saveAccessToken = ({ accessToken }) => ({
    type: 'SAVE_ACCESS_TOKEN',
    accessToken,
});

const action = {
    getAccessToken,
    getUserData,
    saveAccessToken,
    saveUserData,
};

export default action;
