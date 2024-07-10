import {
    ADD_TILE_LIST_OBJECT,
    REMOVE_TILE_LIST_OBJECT,
    PURGE_TILE_LIST,
    UPDATE_TILE_LIST
} from '../actions/types';

const INITIAL_STATE = {
    tileList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TILE_LIST_OBJECT:
            return {
                tileList: action.payload
            };
        case REMOVE_TILE_LIST_OBJECT:
            return {
                tileList: state.tileList.filter((item) => item.key !== action.key)
            };
        case UPDATE_TILE_LIST:
            return {
                ...state,
                tileList: action.payload
            }
        case PURGE_TILE_LIST:
            return {
                tileList: []
            };
        default:
            return state;
    }
};
