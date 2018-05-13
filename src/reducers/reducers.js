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
  classes: null,
  hasClasses: false,
  error: null
};

const filtersInitialState = {
  filters: {}
};

const UIInitialState = {
  filterBarVisible: false
};

export function UI(state = UIInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      return { ...state, filterBarVisible: !state.filterBarVisible };
      break;
    default:
      return state;
  }
}

export function filters(state = filtersInitialState, action) {
  switch (action.type) {
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
        classes: action.classes,
        hasClasses: true
      };
      break;
    case FETCHING_CLASSES_FAILURE:
      return {
        ...state,
        fetching: false,
        classes: null,
        error: action.error,
        hasClasses: false
      };
      break;
    default:
      return state;
  }
}

const gymApp = combineReducers({
  filters: filters,
  classes: classes,
  UI: UI
});

export default gymApp;
