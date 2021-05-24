import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { userDataReducer } from './userDataReducer';
import { playlistsReducer } from './playlistsReducer';
import { currentPlaylistReducer } from './currentPlaylistReducer';
import { errorReducer } from './errorReducer';

const reducers = combineReducers({
    accessToken: accessTokenReducer,
    userData: userDataReducer,
    playlists: playlistsReducer,
    currentPlaylist: currentPlaylistReducer,
    error: errorReducer,
});
export default reducers;
