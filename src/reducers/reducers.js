import { combineReducers } from "redux";
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR,
  ALL_FILTERS_UPDATED,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED
} from "../actions/actions.js";
import { gyms, classes as c } from "../consts.js";
import { find, map, filter, capitalize } from "lodash";

// reducer with initial state
const classesInitialState = {
  fetching: false,
  classes: [],
  error: null
};

const filtersInitialState = {
  filterBarVisible: false,
  filters: {}
};

export function filters(state = filtersInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      return { ...state, filterBarVisible: !state.filterBarVisible };
      break;

    case ALL_FILTERS_UPDATED:
      var newFilters = action.filters;
      newFilters.Gym = map(newFilters.Gym, g => {
        return find(gyms, ["value", g.Name]);
      });
      newFilters.Class = map(newFilters.Class, g => {
        return find(c, ["value", g]);
      });
      return { ...state, filters: newFilters };
      break;

    case GYM_FILTERS_UPDATED:
      var newFilters = state.filters;
      newFilters.Gym = action.gymFilter;
      return { ...state, filters: newFilters };
      break;

    case CLASS_FILTERS_UPDATED:
      var newFilters = state.filters;
      newFilters.Class = action.classFilter;
      return { ...state, filters: newFilters };
      break;

    case DATE_FILTERS_UPDATED:
      var newFilters = state.filters;
      newFilters.Before = action.beforeDate;
      newFilters.After = action.afterDate;
      return { ...state, filters: newFilters };
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
      return {
        ...state,
        fetching: false,
        classes: action.classes
      };
      break;
    case FETCHING_CLASSES_FAILURE:
      return {
        ...state,
        fetching: false,
        classes: null,
        error: action.error
      };
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
