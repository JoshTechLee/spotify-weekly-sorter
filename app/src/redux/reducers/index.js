import { combineReducers } from 'redux';
import { accessTokenReducer } from './accessTokenReducer';
import { userDataReducer } from './userDataReducer';
import { userPlaylistsReducer } from './userPlaylistsReducer';
import { errorReducer } from './errorReducer';

const reducers = combineReducers({
    accessToken: accessTokenReducer,
    userData: userDataReducer,
    userPlaylists: userPlaylistsReducer,
    error: errorReducer,
});
export default reducers;
