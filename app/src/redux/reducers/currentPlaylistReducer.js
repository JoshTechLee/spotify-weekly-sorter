import { ActionTypes } from '../../resources/constants';

const initialState = {
    id: '',
    songPlaying: '',
    songs: [],
};
export const currentPlaylistReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_CURRENT_PLAYLIST_SONGS.FRESH: {
            return {
                ...state,
                songs: payload.songs,
            };
        }
        case ActionTypes.GET_CURRENT_PLAYLIST_SONGS.SUCCESS:
            console.log('we working');
            return {
                ...state,
                songs: [...state.songs, ...payload.songs],
            };
        case ActionTypes.GET_CURRENT_PLAYLIST_DATA.SUCCESS:
            return {
                ...state,
                id: payload.playlistId,
                songPlaying: payload.songPlaying,
            };
        case ActionTypes.SET_CURRENT_PLAYLIST_SONGS.CLEAR: {
            console.log('we here tho boyoyo');
            return {
                ...state,
                songs: [],
            };
        }
        case ActionTypes.CLEAR_CURRENT_PLAYLIST_DATA:
            return initialState;
        default:
            return state;
    }
};
