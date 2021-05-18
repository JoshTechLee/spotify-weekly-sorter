import { combineReducers } from 'redux';
import { initializationReducer } from './initializationReducer';
import { errorReducer } from './errorReducer';
const reducers = combineReducers({
    userData: initializationReducer,
    error: errorReducer,
});
export default reducers;
