import { UPDATE_REWARDS_APP_CUSTOMS, UPDATE_REWARDS_ROOT_URL } from "./types";

export const updateRewardsAppCustoms = (payload) => (
    {
  type: UPDATE_REWARDS_APP_CUSTOMS,
  payload,
});
export const updateRewardsRootURL = (payload) => ({
  type: UPDATE_REWARDS_ROOT_URL,
  payload,
});
