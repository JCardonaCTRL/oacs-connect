import { axiosPost, axiosGet2 } from "./Axios";

var api = {
  getVideos(url) {
    return axiosGet2(url);
  },
  registerEvent(host, videoId) {
    var url = host + `app/tile/videos/play`;
    var params = {
      videoId: videoId,
    };
    return axiosPost(url, params);
  },
};

module.exports = api;
