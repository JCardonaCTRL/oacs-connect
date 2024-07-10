// tileListObjectActions.js
import {
    ADD_TILE_LIST_OBJECT,
    REMOVE_TILE_LIST_OBJECT,
    PURGE_TILE_LIST,
    UPDATE_TILE_LIST
} from './types';

export const addTileListObject = payload => ({ type: ADD_TILE_LIST_OBJECT, payload });
export const removeTileListObject = key => ({ type: REMOVE_TILE_LIST_OBJECT, key });
export const purgeTileListObject = () => ({ type: PURGE_TILE_LIST });
export const updateTileListObject = payload => ({ type: UPDATE_TILE_LIST, payload });