import { axiosGet2, axiosPost2 } from "./Axios";

var api = {
  getIdeasList(url) {
    return axiosGet2(url);
  },
  getCategories(url) {
    return axiosGet2(url);
  },
  getDetails(url) {
    return axiosGet2(url);
  },
  postVote(url, payload) {
    return axiosPost2(url, payload);
  },
  postComment(url, payload) {
    return axiosPost2(url, payload);
  },
  postIdea(url, payload) {
    return axiosPost2(url, payload);
  },
};

module.exports = api;
