import {
    ADD_TILE_INFO_OBJECT,
    DELETE_TILE_INFO_OBJECT,
} from '../actions/types';

const INITIAL_STATE = { tileInfoObject: {} };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TILE_INFO_OBJECT:
            return {
                tileInfoObject: action.payload
            };
        case DELETE_TILE_INFO_OBJECT:
            return INITIAL_STATE; 
        default:
            return state;
    }
};