import { axiosGet2 } from "./Axios";

var api = {
  getAlertsList(url) {
    return axiosGet2(url);
  },
};

module.exports = api;
