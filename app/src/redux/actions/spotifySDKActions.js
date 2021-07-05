import { ActionTypes } from '../../resources/constants';

export const setSpotifySDK = {
    save: (payload) => ({
        type: ActionTypes.SET_SPOTIFY_SDK.SAVE,
        payload,
    }),
    play: (payload) => ({
        type: ActionTypes.SET_SPOTIFY_SDK.PLAY,
        payload,
    }),
    pause: (payload) => ({
        type: ActionTypes.SET_SPOTIFY_SDK.PAUSE,
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
