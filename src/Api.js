export const endpoints = (apiEnv) => {
  const hostname = "https://oacs-hub.visual.ucla.edu";
  return {
    oktaUrl: hostname + "/ctrl-mobile-hub/login/alt-login",
    userProfileUrl: hostname + "/ctrl-mobile-hub/login/userProfile",
    getTileListUrl: hostname + "/ws/app/main/user/tile/list",
    getTileInfoUrl: hostname + "/ws/app/main/tile/info",
    localLoginUrl: hostname + "/ctrl-mobile-hub/login/alt-login",
  };
};
