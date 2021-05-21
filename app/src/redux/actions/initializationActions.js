import { ActionTypes } from '../../resources/constants';

export const getAccessToken = {
    request: (payload) => ({
        type: ActionTypes.GET_ACCESS_TOKEN.REQUEST,
        payload,
    }),
    success: (payload) => ({
        type: ActionTypes.GET_ACCESS_TOKEN.SUCCESS,
        payload,
    }),
    failure: (payload) => ({
        type: ActionTypes.GET_ACCESS_TOKEN.FAILURE,
        payload,
    }),
};

export const getUserData = {
    request: () => ({
        type: ActionTypes.GET_USER_DATA.REQUEST,
    }),
    success: (payload) => ({
        type: ActionTypes.GET_USER_DATA.SUCCESS,
        payload,
    }),
    failure: (payload) => ({
        type: ActionTypes.GET_USER_DATA.FAILURE,
        payload,
    }),
};
