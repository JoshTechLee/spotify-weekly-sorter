import { ActionTypes } from '../../resources/constants';

const initialState = {
    id: '',
    songPlaying: '',
    songs: [],
};
export const currentPlaylistReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_CURRENT_PLAYLIST_SONGS.SUCCESS:
            return {
                ...state,
                songs: [...state.songs, ...payload.songs],
            };
        case ActionTypes.GET_CURRENT_PLAYBACK_DATA.SUCCESS:
            return {
                ...state,
                id: payload.playlistId,
                songPlaying: payload.songPlaying,
            };
        default:
            return state;
    }
};
