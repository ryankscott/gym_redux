import { combineReducers } from 'redux';
import mixpanel from 'mixpanel-browser';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import filter from 'lodash/filter';
import map from 'lodash/map';
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
  LOAD_FILTERS,
} from '../actions/actions';

// reducer with initial state
const classesInitialState = {
  fetching: false,
  classes: null,
  hasClasses: false,
  error: null,
};

const filtersInitialState = {
  class: null,
  gym: null,
  time: {},
  date: {},
  savedFilters: [],
};

const UIInitialState = {
  filterBarVisible: false,
};

export function UI(state = UIInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      mixpanel.track('Toggled filter bar');
      return {
        ...state,
        filterBarVisible: !state.filterBarVisible,
      };
    default:
      return state;
  }
}

export function filters(state = filtersInitialState, action) {
  switch (action.type) {
    case DELETE_FILTERS: {
      const newSavedFilters = filter(state.savedFilters, f => f.name !== action.name);
      return {
        ...state,
        savedFilters: newSavedFilters,
      };
    }

    case LOAD_FILTERS: {
      const newFilters = find(state.savedFilters, f => f.name === action.name);
      mixpanel.track('Loading filters', {
        'Filters Loaded': newFilters,
      });
      return {
        ...newFilters.filters,
        savedFilters: state.savedFilters,
      };
    }
    case SAVE_FILTERS: {
      mixpanel.track('Saving filters');
      if (state.savedFilters.length === 0) {
        const newFilter = [
          {
            name: action.name,
            filters: {
              class: state.class,
              gym: state.gym,
              time: state.time,
              date: state.date,
            },
          },
        ];
        return {
          ...state,
          savedFilters: newFilter,
        };
      }
      const currentFilters = [...state.savedFilters];
      const currentFilterIndex = findIndex(currentFilters, x => x.name === action.name);
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
              date: state.date,
            },
          };
        });

        return {
          ...state,
          savedFilters: newFilters,
        };
      }
      const newFilterList = [
        ...currentFilters,
        {
          name: action.name,
          filters: {
            class: state.class,
            gym: state.gym,
            time: state.time,
            date: state.date,
          },
        },
      ];
      return {
        ...state,
        savedFilters: newFilterList,
      };
    }
    case CLEAR_ALL_FILTERS:
      mixpanel.track('Cleared all filters');
      return {
        class: null,
        gym: null,
        time: {},
        date: {},
        savedFilters: state.savedFilters,
      };

    case GYM_FILTERS_UPDATED: {
      const newFilters = {
        ...state,
      };
      newFilters.gym = action.gymFilter;
      mixpanel.track('Selected Gym Filter', {
        'Gym Selected': newFilters.gym,
      });
      return {
        ...newFilters,
      };
    }
    case CLASS_FILTERS_UPDATED: {
      const newFilters = {
        ...state,
      };
      newFilters.class = action.classFilter;
      mixpanel.track('Selected Class Filter', {
        'Class Selected': newFilters.class,
      });
      return {
        ...newFilters,
      };
    }
    case DATE_FILTERS_UPDATED: {
      mixpanel.track('Selected Date Filter', {
        'Day Selected:': action.dateFilter,
      });
      const newFilter = action.dateFilter;
      const [k, v] = Object.entries(newFilter)[0]; // TODO: this feels wrong

      const dateFilters = { ...state.date };
      if (k in dateFilters) {
        delete dateFilters[k];
      } else {
        dateFilters[k] = v;
      }
      return {
        ...state,
        date: dateFilters,
      };
    }

    case TIME_FILTERS_UPDATED: {
      const newFilter = action.timeFilter;
      const [k, v] = Object.entries(newFilter)[0]; // TODO: this feels wrong
      const timeFilters = { ...state.time };
      if (k in timeFilters) {
        delete timeFilters[k];
      } else {
        timeFilters[k] = v;
      }
      return {
        ...state,
        time: timeFilters,
      };
    }

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
        error: null,
      };
    case FETCHING_CLASSES_SUCCESS:
      return {
        ...state,
        fetching: false,
        classes: action.classes,
        hasClasses: true,
      };
    case FETCHING_CLASSES_FAILURE:
      return {
        ...state,
        fetching: false,
        classes: null,
        error: action.error,
        hasClasses: false,
      };
    default:
      return state;
  }
}

const gymApp = combineReducers({
  UI,
  filters,
  classes,
});

export default gymApp;
