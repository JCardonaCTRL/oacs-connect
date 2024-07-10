// dgsomObjectActions.js

// object initialized after successful login @ oktaLoginScreen, store to async.then(navigate to homescreen);

import {
    LOGIN,
    LOGOUT,
    UPDATE_CURRENT_SCREEN_APP_CODE,
    UPDATE_APP_VERSION,
    UPDATE_LAST_LOGIN,
    ADD_USER_DATA,
    REMOVE_USER_DATA,
    UPDATE_USER_DATA_FIRSTNAME,
    UPDATE_USER_DATA_LASTNAME,
    UPDATE_USER_DATA_EMAIL,
    UPDATE_USER_DATA_DEPARTMENT,
    UPDATE_USER_DATA_OFFICE,
    UPDATE_USER_DATA_MOBILE_NUMBER,
    UPDATE_CURRENT_EVENTS_URL,
    SET_CURRENT_DIGEST_URL,
    PURGE,
    UPDATE_HEADER_COLOR,
    UPDATE_TILE_TITLE,

    UPDATE_DEEP_LINK_PATH,

    SET_ENV,
    UPDATE_USER_TAG_OBJECT,
    UPDATE_API_ENV,
} from './types';

export const login = () => ({ type: LOGIN});
export const logout = () => ({ type: LOGOUT});
export const addUserData = payload => ({ type: ADD_USER_DATA, payload }); 
export const removeUserData = () => ({ type: REMOVE_USER_DATA });
export const updateUserDataFirstname = (payload) => ({ type: UPDATE_USER_DATA_FIRSTNAME, payload });
export const updateUserDataLastname = (payload) => ({ type: UPDATE_USER_DATA_LASTNAME, payload });
export const updateUserDataEmail = (payload) => ({ type: UPDATE_USER_DATA_EMAIL, payload });
export const updateUserDataDepartment = (payload) => ({ type: UPDATE_USER_DATA_DEPARTMENT, payload });
export const updateUserDataOffice = (payload) => ({ type: UPDATE_USER_DATA_OFFICE, payload });
export const updateUserDataMobileNumber = (payload) => ({ type:UPDATE_USER_DATA_MOBILE_NUMBER, payload });

export const updateAppVersion = (payload) => ({ type: UPDATE_APP_VERSION, payload });
export const updateCurrentEventsUrl = (payload) => ({ type: UPDATE_CURRENT_EVENTS_URL, payload });
export const updateLastLogin = (payload) => ({ type: UPDATE_LAST_LOGIN, payload });
export const purge = () => ({ type: PURGE });

export const updateCurrentScreenAppCode = payload => ({ type: UPDATE_CURRENT_SCREEN_APP_CODE, payload });
export const updateHeaderColor = (payload) => ({ type: UPDATE_HEADER_COLOR, payload});
export const updateTileTitle = (payload) => ({ type: UPDATE_TILE_TITLE, payload});

export const updateDeepLinkPath = (payload) => ({ type: UPDATE_DEEP_LINK_PATH, payload});

// on banner click
export const setCurrentDigestUrl = (payload) => ({ type: SET_CURRENT_DIGEST_URL, payload });

export const setEnv = (payload) => ({ type: SET_ENV, payload });
export const updateUserTagObject = (payload) => ({ type: UPDATE_USER_TAG_OBJECT, payload});
export const updateApiEnv = (payload) => ({ type: UPDATE_API_ENV, payload});