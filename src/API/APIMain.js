import { axiosGet, axiosGet2 } from "./Axios";

var apiMain = {
  getUserTilesList(url) {
    return axiosGet2(url, {});
  },
  getTileInfo2(url) {
    return axiosGet2(url, {});
  },
  getTileInfo(url) {
    return axiosGet(url, {});
  },
  getCurrentEventsList(url) {
    return axiosGet2(url, {});
  },
};
module.exports = apiMain;
