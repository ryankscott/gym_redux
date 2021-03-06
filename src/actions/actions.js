// Action types
export const FETCHING_CLASSES = 'FETCHING_CLASSES';
export const FETCHING_ALL_CLASSES = 'FETCHING_ALL_CLASSES';
export const FETCHING_CLASSES_SUCCESS = 'FETCHING_CLASSES_SUCCESS';
export const FETCHING_CLASSES_FAILURE = 'FETCHING_CLASSES_FAILURE';
export const TOGGLE_FILTER_BAR = 'TOGGLE_FILTER_BAR';
export const GYM_FILTERS_UPDATED = 'GYM_FILTERS_UPDATED';
export const CLASS_FILTERS_UPDATED = 'CLASS_FILTERS_UPDATED';
export const DATE_FILTERS_UPDATED = 'DATE_FILTERS_UPDATED';
export const TIME_FILTERS_UPDATED = 'TIME_FILTERS_UPDATED';
export const VIRTUAL_CLASSES_FILTERS_UPDATED =
  'VIRTUAL_CLASSES_FILTERS_UPDATED';
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS';
export const SAVE_FILTERS = 'SAVE_FILTERS';
export const DELETE_FILTERS = 'DELETE_FILTERS';
export const LOAD_FILTERS = 'LOAD_FILTERS';
export const FETCHING_CLASSTYPES = 'FETCHING_CLASSTYPES';
export const FETCHING_CLASSTYPES_SUCCESS = 'FETCHING_CLASSTYPES_SUCCESS';
export const FETCHING_CLASSTYPES_FAILURE = 'FETCHING_CLASSTYPES_FAILURE';

// Action creators
export const getAllClasses = () => ({
  type: FETCHING_ALL_CLASSES,
});

export const getClasses = () => ({
  type: FETCHING_CLASSES,
});

export const getClasstypes = () => ({
  type: FETCHING_CLASSTYPES,
});

export const getClasstypesFailure = error => ({
  type: FETCHING_CLASSTYPES_FAILURE,
  error,
  receivedAt: Date.now(),
});

export const getClasstypesSuccess = classtypes => ({
  type: FETCHING_CLASSTYPES_SUCCESS,
  classtypes,
  receivedAt: Date.now(),
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

export const updateVirtualClassesFilters = () => ({
  type: VIRTUAL_CLASSES_FILTERS_UPDATED,
});

export const getClassesSuccess = classes => ({
  type: FETCHING_CLASSES_SUCCESS,
  classes,
  receivedAt: Date.now(),
});
