import {
    ADD_TILE_INFO_OBJECT,
    DELETE_TILE_INFO_OBJECT,
} from './types';

export const addTileInfoObject = payload => ({ type: ADD_TILE_INFO_OBJECT, payload });
export const deleteTileInfoObject = payload => ({ type: DELETE_TILE_INFO_OBJECT, payload });