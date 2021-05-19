import { combineReducers } from 'redux';
import { userDataReducer } from './userDataReducer';
import { errorReducer } from './errorReducer';
const reducers = combineReducers({
    userData: userDataReducer,
    error: errorReducer,
});
export default reducers;
