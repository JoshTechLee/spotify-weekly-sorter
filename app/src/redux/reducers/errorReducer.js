import { ActionTypes } from '../constants/actionTypes';

const initialState = {
    error: [],
    isOpen: false,
};

export const errorReducer = (state = initialState, action) => {
    const { error } = action;
    if (error) return { error: [...state.error, error], isOpen: true };
    else if (action.type === ActionTypes.HIDE_ERROR) return { error: [], isOpen: false };
    return state;
};
