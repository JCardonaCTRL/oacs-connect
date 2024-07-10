import {
  UPDATE_REWARDS_APP_CUSTOMS,
  UPDATE_REWARDS_ROOT_URL,
} from "../actions/types";

const INITIAL_STATE = { rewardsRootURL: "", rewardsAppCustoms: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_REWARDS_ROOT_URL:
      return {
        rewardsRootURL: action.paylaod,
      };
    case UPDATE_REWARDS_APP_CUSTOMS:
      return {
        rewardsAppCustoms: action.paylaod,
      };
    default:
      return state;
  }
};
