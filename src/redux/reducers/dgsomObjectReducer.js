import {
    LOGIN,
    // LOGOUT may be unnecessary if purging all redux-persist store @ logout
    LOGOUT,
    UPDATE_APP_VERSION,
    UPDATE_LAST_LOGIN,
    ADD_USER_DATA,
    REMOVE_USER_DATA,
    PURGE,
    UPDATE_USER_DATA_FIRSTNAME,
    UPDATE_USER_DATA_LASTNAME,
    UPDATE_USER_DATA_EMAIL,
    UPDATE_USER_DATA_DEPARTMENT,
    UPDATE_USER_DATA_OFFICE,
    UPDATE_USER_DATA_MOBILE_NUMBER,

    UPDATE_CURRENT_SCREEN_APP_CODE,
    UPDATE_HEADER_COLOR,
    UPDATE_TILE_TITLE,

    UPDATE_CURRENT_EVENTS_URL,
    SET_CURRENT_DIGEST_URL,
    UPDATE_DEEP_LINK_PATH,

    SET_ENV,
    UPDATE_USER_TAG_OBJECT,
    UPDATE_TILE_LIST,
    UPDATE_API_ENV,
} from '../actions/types';

const INITIAL_STATE = {
    apiEnv: 'PROD',
    appVersion: '',
    isLoggedIn: false,
    lastLogin: '',
    env: 'Not_specified',
    userTagObject: {},
    userData: {
        uid: '',
        email: '',
        firstname: 'user',
        lastname: '',
        jwtToken: '',
        department: '',
        office: '',
        mobileNumber: ''
    },
    headerColor: '#5f609d',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        // LOGOUT may be unnecessary if purging all redux-persist store @ logout beause initial_state for isLoggedIn is false 
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        case UPDATE_APP_VERSION:
            return {
                ...state,
                appVersion: action.payload,
            };
        case UPDATE_LAST_LOGIN:
            return {
                ...state,
                lastLogin: action.payload,
            };
        case ADD_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        case REMOVE_USER_DATA:
            return {
                ...state,
                userData: null,
            };
        case UPDATE_USER_DATA_FIRSTNAME:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    firstname: action.payload,
                },
            };
        case UPDATE_USER_DATA_LASTNAME:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    lastname: action.payload,
                },
            };
        case UPDATE_USER_DATA_EMAIL:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    email: action.payload,
                },
            };
        case UPDATE_USER_DATA_DEPARTMENT:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    department: action.payload,
                },
            };
        case UPDATE_USER_DATA_OFFICE:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    office: action.payload,
                },
            };
        case UPDATE_USER_DATA_MOBILE_NUMBER:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    mobileNumber: action.payload,
                }
            };
        case UPDATE_DEEP_LINK_PATH:
            return {
                ...state,
                deepLinkPath: action.payload,
            };

        // TODO: consolidate screenAppCode, tileTitle and headerColor into activeTileInfo obj
        case UPDATE_CURRENT_SCREEN_APP_CODE:
            return {
                ...state,
                currentScreenAppCode: action.payload, // action.payload.appCode
            };
        case UPDATE_HEADER_COLOR:
            return {
                ...state,
                headerColor: action.payload, // action.payload.headerColor
            };
        case UPDATE_TILE_TITLE:
            return {
                ...state,
                tileTitle: action.payload, // action.payload.tileTitle
            };
        // end here

        case UPDATE_CURRENT_EVENTS_URL:
            return {
                ...state,
                currentEventsUrl: action.payload,
            };
        case SET_CURRENT_DIGEST_URL:
            return {
                ...state,
                currentDigestUrl: action.payload,
            };
        case UPDATE_USER_TAG_OBJECT:
            return {
                ...state,
                userTagObject: action.payload,
            };
        case SET_ENV:
            return {
                ...state,
                env: action.payload,
            };
        case UPDATE_API_ENV:
            return {
                ...state,
                apiEnv: action.payload,
            }
        default:
            return state;
        case PURGE:
            return INITIAL_STATE;
    }
};