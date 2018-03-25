import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR
} from "../actions/actiontypes";

// reducer with initial state
const classesInitialState = {
  fetching: false,
  classes: [],
  error: null
};

const filtersInitialState = {
  filterBarVisible: false
};

export function filters(state = filtersInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      return { ...state, filterBarVisible: !state.filterBarVisible };
      break;
    default:
      return state;
  }
}

export function classes(state = classesInitialState, action) {
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
  filters: filters,
  classes: classes
});

export default gymApp;
