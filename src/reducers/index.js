import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS
} from "../actions/actiontypes";

// reducer with initial state
const initialState = {
  fetching: false,
  classes: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_CLASSES:
      return { ...state, fetching: true, error: null };
      break;
    case FETCHING_CLASSES_SUCCESS:
      return { ...state, fetching: false, classes: action.classes };
      break;
    case FETCHING_CLASSES_FAILURE:
      return { ...state, fetching: false, classes: null, error: action.error };
      break;
    default:
      return state;
  }
}

const gymApp = combineReducers({
  visibilityFilter,
  reducer
});

export default gymApp;
