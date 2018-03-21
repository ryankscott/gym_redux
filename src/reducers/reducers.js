import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS
} from "../actions/actiontypes";

// reducer with initial state
const classesInitialState = {
  fetching: false,
  classes: [],
  error: null
};

export function classes(state = classesInitialState, action) {
  switch (action.type) {
    case FETCHING_CLASSES:
      return { ...state, fetching: true, error: null };
      break;
    case FETCHING_CLASSES_SUCCESS:
      console.log(action);
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
  filters: visibilityFilter,
  classes: classes
});

export default gymApp;
