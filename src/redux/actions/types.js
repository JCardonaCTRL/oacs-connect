// Types.js -- string constants action types

// dgsomObject:
/*
 *    {
 *        appVersion: '',
 *      isLoggedIn: false,
 *       lastLogin: '',
 *        env: '',
 *           OU: {}
 *       userData: {
 *           firstname: '',
 *           lastname: '',
 *           email: '',
 *           uid: '',
 *           department: '',
 *           office: '',
 *           mobileNumber: ''
 *       }
 *   }
 */
export const LOGIN = "login";
// LOGOUT may be unnecessary if purging all redux-persist store @ logout
export const LOGOUT = "logout";
export const UPDATE_APP_VERSION = "update_app_version";
export const UPDATE_LAST_LOGIN = "update_last_login";

// currentScreenAppCode : set in HomeScreen when pressing a tile. for getTileInfo api within tile screen component
export const UPDATE_CURRENT_SCREEN_APP_CODE = "update_current_screen_app_code";
export const UPDATE_HEADER_COLOR = "update_header_color"; // header color w/in tile
export const UPDATE_TILE_TITLE = "update_tile_title"; // header title w/in tile

// deepLinkPath : set in HomeScreen mount. used to determine if to use deep linking to navigate to screen
export const UPDATE_DEEP_LINK_PATH = "update_deep_link_path";

// currentDigestUrl : set in HomeScreen when pressing current event carousel card for url in digest tile screen component. set to null on HomeScreen mount
export const SET_CURRENT_DIGEST_URL = "set_current_digest_url";

// currentEventsUrl : set in HomeScreen from getTileList API for currentEvents API for carousel
export const UPDATE_CURRENT_EVENTS_URL = "update_current_events_url";

// userTagObject for OneSignal.sendTags used in homeScreen after object comparison between redux value and ret from getTileList api
export const UPDATE_USER_TAG_OBJECT = "update_user_tag_object";

// set in authHomeScreen for OneSignal.sendTags in HomeScreen -- OneSignal testflight, production or other
export const SET_ENV = "set_env";

// userData: set in HomeScreen and in profile screens
export const ADD_USER_DATA = "add_user_data";
export const REMOVE_USER_DATA = "remove_user_data";
export const UPDATE_USER_DATA_FIRSTNAME = "update_user_data_firstname";
export const UPDATE_USER_DATA_LASTNAME = "update_user_data_lastname";
export const UPDATE_USER_DATA_EMAIL = "update_user_data_email";
export const UPDATE_USER_DATA_DEPARTMENT = "update_user_data_department";
export const UPDATE_USER_DATA_OFFICE = "update_user_data_location";
export const UPDATE_USER_DATA_MOBILE_NUMBER = "update_user_data_mobile_number";

export const PURGE = "purge";

// tileListObject:
/*
 *   {
 *       tileList: [{}, {}, {}]
 *   }
 */
export const ADD_TILE_LIST_OBJECT = "add_tile_list_object";
export const REMOVE_TILE_LIST_OBJECT = "remove_tile_list_object";
export const PURGE_TILE_LIST = "purge_tile_list_object";
export const UPDATE_TILE_LIST = "update_tile_list";

// tileInfoObject:
/*
 *   {
 *       tileInfoObject: {}
 *   }
 */

export const ADD_TILE_INFO_OBJECT = "add_tile_info_object";
export const DELETE_TILE_INFO_OBJECT = "delete_tile_info_object";

// visual vs prod
export const UPDATE_API_ENV = "update_api_env";

//REWARDS
export const UPDATE_REWARDS_ROOT_URL = "update_rewards_root_url";
export const UPDATE_REWARDS_APP_CUSTOMS = "update_rewards_app_customs";
