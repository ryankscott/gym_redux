import { combineReducers } from 'redux';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { trackEvent } from '../analytics';
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED,
  TIME_FILTERS_UPDATED,
  VIRTUAL_CLASSES_FILTERS_UPDATED,
  CLEAR_ALL_FILTERS,
  DELETE_FILTERS,
  SAVE_FILTERS,
  LOAD_FILTERS,
  FETCHING_CLASSTYPES,
  FETCHING_CLASSTYPES_FAILURE,
  FETCHING_CLASSTYPES_SUCCESS,
} from '../actions/actions';

const classesInitialState = {
  fetching: false,
  classes: null,
  hasClasses: false,
  error: null,
};

const classtypesInitialState = {
  classtypes: null,
};

const filtersInitialState = {
  class: null,
  gym: null,
  time: {},
  date: {},
  virtualClasses: true,
  savedFilters: [],
};

const UIInitialState = {
  filterBarVisible: false,
};

export function UI(state = UIInitialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_BAR:
      trackEvent('toggled_filter_bar');
      return {
        ...state,
        filterBarVisible: !state.filterBarVisible,
      };
    default:
      return state;
  }
}
// TODO: Add tests
export function filters(state = filtersInitialState, action) {
  switch (action.type) {
    case DELETE_FILTERS: {
      const newSavedFilters = filter(
        state.savedFilters,
        f => f.name !== action.name,
      );
      return {
        ...state,
        savedFilters: newSavedFilters,
      };
    }

    case LOAD_FILTERS: {
      const newFilters = find(state.savedFilters, f => f.name === action.name);
      trackEvent('loading_filters', {
        'Filters Loaded': newFilters,
      });
      return {
        ...newFilters.filters,
        savedFilters: state.savedFilters,
      };
    }
    case SAVE_FILTERS: {
      trackEvent('saving_filters');
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
      const currentFilterIndex = findIndex(
        currentFilters,
        x => x.name === action.name,
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
      trackEvent('cleared_all_filters');
      return {
        class: null,
        gym: null,
        time: {},
        date: {},
        virtualClasses: false,
        savedFilters: state.savedFilters,
      };

    case GYM_FILTERS_UPDATED: {
      const newFilters = {
        ...state,
      };
      newFilters.gym = action.gymFilter;
      trackEvent('selected_gym_filter', {
        Gym: newFilters.gym,
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
      trackEvent('selected_class_filter', {
        Class: newFilters.class,
      });
      return {
        ...newFilters,
      };
    }
    case DATE_FILTERS_UPDATED: {
      trackEvent('selected_date_filter', {
        'Date:': action.dateFilter,
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
      trackEvent('selected_time_filter', {
        'Time:': action.timeFilter,
      });
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

    case VIRTUAL_CLASSES_FILTERS_UPDATED: {
      trackEvent('virtual_classes_toggled');
      return {
        ...state,
        fetching: true,
        virtualClasses: !state.virtualClasses,
      };
    }

    default:
      return state;
  }
}

export function classtypes(state = classtypesInitialState, action) {
  switch (action.type) {
    case FETCHING_CLASSTYPES:
      return {
        ...state,
      };
    case FETCHING_CLASSTYPES_SUCCESS:
      return {
        ...state,
        classtypes: action.classtypes,
      };
    case FETCHING_CLASSTYPES_FAILURE:
      return {
        ...state,
        classtypes: null,
        error: action.error,
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
  classtypes,
});

export default gymApp;
