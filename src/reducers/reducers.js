import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED,
  TIME_FILTERS_UPDATED,
  CLEAR_ALL_FILTERS
} from "../actions/actions.js";
import { gyms, classes as c } from "../consts.js";

import { find, map, filter, capitalize, get, reduce } from "lodash";
import { combineReducers } from "redux";

// reducer with initial state
const classesInitialState = {
  fetching: false,
  classes: null,
  hasClasses: false,
  error: null
};

const filtersInitialState = {
  class: null,
  gym: null,
  time: null,
  date: null
};

const UIInitialState = {
  filterBarVisible: false
};

export function UI(state = UIInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      return { ...state, filterBarVisible: !state.filterBarVisible };
    default:
      return state;
  }
}

export function filters(state = filtersInitialState, action) {
  switch (action.type) {
    case CLEAR_ALL_FILTERS:
      return { class: null, gym: null, time: null, date: null };

    case GYM_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.gym = action.gymFilter;
      return { ...state, filters: newFilters };

    case CLASS_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.class = action.classFilter;
      return { ...state, filters: newFilters };

    case DATE_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.date = action.dateFilter;
      return { ...state, filters: newFilters };

    case TIME_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.time = action.timeFilter;
      return { ...state, filters: newFilters };

    default:
      return state;
  }
}

export function classes(state = classesInitialState, action) {
  switch (action.type) {
    case FETCHING_CLASSES:
      return { ...state, fetching: true, error: null };
    case FETCHING_CLASSES_SUCCESS:
      return {
        ...state,
        fetching: false,
        classes: action.classes,
        hasClasses: true
      };
    case FETCHING_CLASSES_FAILURE:
      return {
        ...state,
        fetching: false,
        classes: null,
        error: action.error,
        hasClasses: false
      };
    default:
      return state;
  }
}

const gymApp = combineReducers({
  UI: UI,
  filters: filters,
  classes: classes
});

export default gymApp;
