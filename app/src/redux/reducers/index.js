import { combineReducers } from 'redux';
import { userDataReducer } from './userDataReducer';
import { errorReducer } from './errorReducer';
import { userPlaylistsReducer } from './userPlaylistsReducer';

const reducers = combineReducers({
    userData: userDataReducer,
    userPlaylists: userPlaylistsReducer,
    error: errorReducer,
});
export default reducers;
