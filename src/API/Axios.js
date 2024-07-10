const axios = require("axios");
import axiosRetry from "axios-retry";
import {
  getBaseOs,
  getBuildId,
  getBuildNumber,
  getBundleId,
  getDevice,
  getDeviceName,
  getManufacturer,
  getModel,
  getSystemVersion,
  getVersion,
  getUserAgent,
} from "react-native-device-info";
import { store, persistor } from "../redux/store";

//REQUEST INTERCEPTOR
axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const JWTToken = state.dgsomAppObjectReducer.userData.jwtToken;

    config.headers["Authorization"] = "Bearer " + JWTToken;
    config.headers["base_os"] = JSON.stringify(getBaseOs());
    config.headers["build_id"] = JSON.stringify(getBuildId());
    config.headers["build_number"] = JSON.stringify(getBuildNumber());
    config.headers["bundle_id"] = JSON.stringify(getBundleId());
    config.headers["device"] = JSON.stringify(getDevice());
    config.headers["device_name"] = JSON.stringify(getDeviceName());
    config.headers["manufacturer"] = JSON.stringify(getManufacturer());
    config.headers["model"] = JSON.stringify(getModel());
    config.headers["system_version"] = JSON.stringify(getSystemVersion());
    config.headers["version"] = JSON.stringify(getVersion());
    config.headers["user_agent"] = JSON.stringify(getUserAgent());
    // other info
    config.headers["env"] = state.dgsomAppObjectReducer.env;
    config.headers["app_version"] = state.dgsomAppObjectReducer.appVersion;
    config.headers["api"] = state.dgsomAppObjectReducer.apiEnv;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//RESPONSE INTERCEPTOR
axios.interceptors.response.use(
  (response) => {
    // console.warn(response);
    return response;
  },
  function(error) {
    //Handling Infinite Loop - if refreshtoken API fails -- clear the storage and redirect to Login page
    if (error.message.toString().includes("401")) {
      return Promise.reject(error.message);
    }
  }
);

//GET REQUEST
export const axiosGet = async (requestURL, requestParams) => {
  const state = store.getState();
  const genericProps = {
    appCode: state.dgsomAppObjectReducer.currentScreenAppCode,
  };
  axiosRetry(axios, { retries: 3 });

  const response = await axios
    .get(requestURL, {
      params: { ...requestParams, ...genericProps },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response)
        return {
          success: false,
          message: error.response.data.response_message,
        };
      else
        return {
          success: false,
          message: error.message,
        };
    });

  return response;
};

export const axiosGet2 = async (requestURL, requestParams) => {
  const state = store.getState();
  const genericProps = {
    appCode: state.dgsomAppObjectReducer.currentScreenAppCode,
  };
  //axiosRetry(axios, { retries: 3 });
  const response = await axios
    .get(requestURL, {
      params: { ...requestParams, ...genericProps },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.includes("401"))
        return {
          success: false,
          message: "logout",
        };
      else
        return {
          success: false,
          message: error.message,
        };
    });
  return response;
};

//POST REQUEST
export const axiosPost = async (requestURL, requestParams) => {
  const state = store.getState();
  const genericProps = {
    appCode: state.dgsomAppObjectReducer.currentScreenAppCode,
  };
  return axios
    .post(requestURL, { ...requestParams, ...genericProps })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response)
        return {
          success: false,
          message: error.response.data.response_message,
        };
      else
        return {
          success: false,
          message: error.message,
        };
    });
};

export const axiosPost2 = async (requestURL, requestParams) => {
  // console.warn(requestURL);

  const state = store.getState();
  const genericProps = {
    appCode: state.dgsomAppObjectReducer.currentScreenAppCode,
  };
  return axios
    .post(requestURL, { ...requestParams, ...genericProps })
    .then((response) => {
      //  console.warn(response);
      return response;
    })

    .catch((error) => {
      if (error.response)
        return {
          success: false,
          message: error.response.data.response_message,
        };
      else
        return {
          success: false,
          message: error.message,
        };
    });
};

export const axiosPut = async (requestURL, requestParams) => {
  const state = store.getState();
  const genericProps = {
    appCode: state.dgsomAppObjectReducer.currentScreenAppCode,
  };

  return axios
    .put(requestURL, { ...requestParams, ...genericProps })
    .then((response) => {
      // console.warn(response);
      return response.data;
    })
    .catch((error) => {
      if (error.response)
        return {
          success: false,
          message: error.response.data.response_message,
        };
      else
        return {
          success: false,
          message: error.message,
        };
    });
};

export const axiosDelete = async (requestURL, requestParams) => {
  const state = store.getState();
  const genericProps = {
    appCode: state.dgsomAppObjectReducer.currentScreenAppCode,
  };

  return axios
    .delete(requestURL, { data: { ...requestParams, ...genericProps } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response)
        return {
          success: false,
          message: error.response.data.response_message,
        };
      else
        return {
          success: false,
          message: error.message,
        };
    });
};
