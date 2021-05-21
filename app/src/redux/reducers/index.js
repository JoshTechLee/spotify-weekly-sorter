import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { userDataReducer } from './userDataReducer';
import { playlistsReducer } from './playlistsReducer';
import { errorReducer } from './errorReducer';

const reducers = combineReducers({
    accessToken: accessTokenReducer,
    userData: userDataReducer,
    playlists: playlistsReducer,
    error: errorReducer,
});
export default reducers;
