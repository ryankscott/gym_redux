import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED,
  TIME_FILTERS_UPDATED,
  CLEAR_ALL_FILTERS,
  DELETE_FILTERS,
  SAVE_FILTERS
} from "../actions/actions.js";
import { gyms, classes as c } from "../consts.js";

import { find, map, filter, capitalize, get, reduce } from "lodash";
import { combineReducers } from "redux";
import mixpanel from "mixpanel-browser";
// TODO:
// - Work out what analytics should be sent on gym/class filters
// -

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
  date: null,
  savedFilters: null
};

const UIInitialState = {
  filterBarVisible: false
};

export function UI(state = UIInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      mixpanel.track("Toggled filter bar");
      return { ...state, filterBarVisible: !state.filterBarVisible };
    default:
      return state;
  }
}

export function filters(state = filtersInitialState, action) {
  switch (action.type) {
    case DELETE_FILTERS:
      return { ...state };

    case SAVE_FILTERS:
      var newFilters = state;
      debugger;
      // TODO: solve duplicates
      if (newFilters.savedFilters == null) {
        var uniqueFilters = new Set();
      } else {
        var uniqueFilters = new Set(newFilters.savedFilters);
      }
      uniqueFilters.add({
        class: state.class,
        gym: state.gym,
        time: state.time,
        date: state.date
      });
      newFilters.savedFilters = Array.from(uniqueFilters);
      return { ...newFilters };

    case CLEAR_ALL_FILTERS:
      mixpanel.track("Cleared all filters");
      return { class: null, gym: null, time: null, date: null };

    case GYM_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.gym = action.gymFilter;
      mixpanel.track("Selected Gym Filter", {
        "Gym Selected": newFilters.gym
      });
      return { ...newFilters };

    case CLASS_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.class = action.classFilter;
      mixpanel.track("Selected Class Filter", {
        "Class Selected": newFilters.class
      });
      return { ...newFilters };

    case DATE_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.date = action.dateFilter;
      mixpanel.track("Selected Date Filter", {
        "Day Selected:": newFilters.date.dayOfweek
      });
      return { ...newFilters };

    case TIME_FILTERS_UPDATED:
      var newFilters = state;
      newFilters.time = action.timeFilter;
      mixpanel.track("Selected Time Filter", {
        "Time Selected:": newFilters.time.period
      });
      return { ...newFilters };

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
