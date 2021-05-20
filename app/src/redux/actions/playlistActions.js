import { ActionTypes } from '../constants/actionTypes';

export const getUserPlaylists = {
    request: () => ({
        type: ActionTypes.GET_USER_PLAYLISTS.REQUEST,
    }),
    success: ({ playlists }) => ({
        type: ActionTypes.GET_USER_PLAYLISTS.SUCCESS,
        playlists,
    }),
    failure: ({ error }) => ({
        type: ActionTypes.GET_USER_PLAYLISTS.FAILURE,
        error,
    }),
};
