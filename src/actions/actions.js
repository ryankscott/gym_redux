// Action types

export const FETCHING_CLASSES = 'FETCHING_CLASSES';
export const FETCHING_CLASSES_SUCCESS = 'FETCHING_CLASSES_SUCCESS';
export const FETCHING_CLASSES_FAILURE = 'FETCHING_CLASSES_FAILURE';
export const TOGGLE_FILTER_BAR = 'TOGGLE_FILTER_BAR';
export const GYM_FILTERS_UPDATED = 'GYM_FILTERS_UPDATED';
export const CLASS_FILTERS_UPDATED = 'CLASS_FILTERS_UPDATED';
export const DATE_FILTERS_UPDATED = 'DATE_FILTERS_UPDATED';
export const TIME_FILTERS_UPDATED = 'TIME_FILTERS_UPDATED';
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS';
export const SAVE_FILTERS = 'SAVE_FILTERS';
export const DELETE_FILTERS = 'DELETE_FILTERS';
export const LOAD_FILTERS = 'LOAD_FILTERS';

// Action creators
export const getClasses = () => ({
  type: FETCHING_CLASSES,
});

export const loadFilters = name => ({
  type: LOAD_FILTERS,
  name,
});

export const toggleFilterBar = () => ({
  type: TOGGLE_FILTER_BAR,
});

export const clearAllFilters = () => ({
  type: CLEAR_ALL_FILTERS,
});

export const saveFilters = name => ({
  type: SAVE_FILTERS,
  name,
});

export const deleteFilters = name => ({
  type: DELETE_FILTERS,
  name,
});

export const getClassesFailure = data => ({
  type: FETCHING_CLASSES_FAILURE,
  error: data,
  receivedAt: Date.now(),
});

export const updateClassFilters = classes => ({
  type: CLASS_FILTERS_UPDATED,
  classFilter: classes,
});

export const updateGymFilters = gym => ({
  type: GYM_FILTERS_UPDATED,
  gymFilter: gym,
});

export const updateDateFilters = dates => ({
  type: DATE_FILTERS_UPDATED,
  dateFilter: dates,
});

export const updateTimeFilters = times => ({
  type: TIME_FILTERS_UPDATED,
  timeFilter: times,
});

export const getClassesSuccess = classes => ({
  type: FETCHING_CLASSES_SUCCESS,
  classes,
  receivedAt: Date.now(),
});
