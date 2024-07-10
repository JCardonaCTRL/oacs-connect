import { axiosPost2 } from "./Axios";
var api = {
  postUserPofile(url, payload) {
    return axiosPost2(url, payload);
  },
};

module.exports = api;
