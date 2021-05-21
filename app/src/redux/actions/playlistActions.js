import { ActionTypes } from '../../resources/constants';

export const getUserPlaylists = {
    request: () => ({
        type: ActionTypes.GET_USER_PLAYLISTS.REQUEST,
    }),
    success: (payload) => ({
        type: ActionTypes.GET_USER_PLAYLISTS.SUCCESS,
        payload,
    }),
    failure: (payload) => ({
        type: ActionTypes.GET_USER_PLAYLISTS.FAILURE,
        payload,
    }),
};
