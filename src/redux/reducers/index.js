// root reducer
// reducers/index.js

import { combineReducers } from "redux";
import dgsomAppObjectReducer from "./dgsomObjectReducer";
import tileListObjectReducer from "./tileListObjectReducer";
import alistObjectReducer from "./alistObjectReducer";
import digestObjectReducer from "./digestObjectReducer";
import fgitObjectReducer from "./fgitObjectReducer";
import rewardsObjectReducer from "./rewardsObjectReducer";

// root reducer:
export default combineReducers({
  dgsomAppObjectReducer,
  tileListObjectReducer,
  // add inidividual tile reducers here
  alistObjectReducer,
  digestObjectReducer,
  fgitObjectReducer,
  rewardsObjectReducer,
});
