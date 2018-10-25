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
  SAVE_FILTERS,
  LOAD_FILTERS
} from "../actions/actions.js";

import { combineReducers } from "redux";
import mixpanel from "mixpanel-browser";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import filter from "lodash/filter";
import without from "lodash/without";
import uniq from "lodash/uniq";
import map from "lodash/map";

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
  savedFilters: []
};

const UIInitialState = {
  filterBarVisible: false
};

export function UI(state = UIInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      mixpanel.track("Toggled filter bar");
      return {
        ...state,
        filterBarVisible: !state.filterBarVisible
      };
    default:
      return state;
  }
}

export function filters(state = filtersInitialState, action) {
  switch (action.type) {
    case DELETE_FILTERS:
      const newSavedFilters = filter(state.savedFilters, filter => {
        return filter.name != action.name;
      });
      return {
        ...state,
        savedFilters: newSavedFilters
      };

    case LOAD_FILTERS:
      const savedFilters = state.savedFilters;
      const newFilters = find(savedFilters, filter => {
        return filter.name == action.name;
      });
      mixpanel.track("Loading filters", {
        "Filters Loaded": newFilters
      });
      return {
        ...newFilters.filters,
        savedFilters: savedFilters
      };

    case SAVE_FILTERS:
      mixpanel.track("Saving filters");
      if (state.savedFilters.length == 0) {
        const newFilter = [
          {
            name: action.name,
            filters: {
              class: state.class,
              gym: state.gym,
              time: state.time,
              date: state.date
            }
          }
        ];
        return {
          ...state,
          savedFilters: newFilter
        };
      }
      const currentFilters = [...state.savedFilters];
      const currentFilterIndex = findIndex(
        currentFilters,
        x => x.name == action.name
      );
      if (currentFilterIndex > -1) {
        const newFilters = map(currentFilters, (filter, index) => {
          if (index !== currentFilterIndex) {
            return filter;
          }
          return {
            name: action.name,
            filters: {
              class: state.class,
              gym: state.gym,
              time: state.time,
              date: state.date
            }
          };
        });

        return {
          ...state,
          savedFilters: newFilters
        };
      } else {
        const newFilters = [
          ...currentFilters,
          {
            name: action.name,
            filters: {
              class: state.class,
              gym: state.gym,
              time: state.time,
              date: state.date
            }
          }
        ];
        return {
          ...state,
          savedFilters: newFilters
        };
      }

    case CLEAR_ALL_FILTERS:
      mixpanel.track("Cleared all filters");
      return {
        class: null,
        gym: null,
        time: null,
        date: null,
        savedFilters: state.savedFilters
      };

    case GYM_FILTERS_UPDATED:
      var newFilters = {
        ...state
      };
      newFilters.gym = action.gymFilter;
      mixpanel.track("Selected Gym Filter", {
        "Gym Selected": newFilters.gym
      });
      return {
        ...newFilters
      };

    case CLASS_FILTERS_UPDATED:
      var newFilters = {
        ...state
      };
      newFilters.class = action.classFilter;
      mixpanel.track("Selected Class Filter", {
        "Class Selected": newFilters.class
      });
      return {
        ...newFilters
      };

    case DATE_FILTERS_UPDATED:
      mixpanel.track("Selected Date Filter", {
        "Day Selected:": action.dateFilter
      });
      const isAlreadyDateFiltered =
        find(state.date, action.dateFilter) != undefined;
      if (isAlreadyDateFiltered) {
        const newFilters = without(state.date, action.dateFilter);
        return {
          ...state,
          date: newFilters
        };
      }

      const newDateFilters = [...(state.date || []), action.dateFilter];
      const uniqDateFilters = uniq(newDateFilters);
      return {
        ...state,
        date: uniqDateFilters
      };

    case TIME_FILTERS_UPDATED:
      const isAlreadyTimeFiltered =
        find(state.time, action.timeFilter) != undefined;
      if (isAlreadyTimeFiltered) {
        const newFilters = without(state.time, action.timeFilter);
        return {
          ...state,
          time: newFilters
        };
      }

      const newTimeFilters = [...(state.time || []), action.timeFilter];
      const uniqTimeFilters = uniq(newTimeFilters);
      return {
        ...state,
        time: uniqTimeFilters
      };

    default:
      return state;
  }
}

export function classes(state = classesInitialState, action) {
  switch (action.type) {
    case FETCHING_CLASSES:
      return {
        ...state,
        fetching: true,
        error: null
      };
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
