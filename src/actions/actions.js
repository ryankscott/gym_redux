export const FETCHING_CLASSES = "FETCHING_CLASSES";
export const FETCHING_CLASSES_SUCCESS = "FETCHING_CLASSES_SUCCESS";
export const FETCHING_CLASSES_FAILURE = "FETCHING_CLASSES_FAILURE";
export const TOGGLE_FILTER_BAR = "TOGGLE_FILTER_BAR";
export const ALL_FILTERS_UPDATED = "ALL_FILTERS_UPDATED";
export const GYM_FILTERS_UPDATED = "GYM_FILTERS_UPDATED";
export const CLASS_FILTERS_UPDATED = "CLASS_FILTERS_UPDATED";
export const DATE_FILTERS_UPDATED = "DATE_FILTERS_UPDATED";
export const TIME_FILTERS_UPDATED = "TIME_FILTERS_UPDATED";

export const getClasses = query => {
  return {
    type: FETCHING_CLASSES,
    query
  };
};

export const toggleFilterBar = () => {
  return {
    type: TOGGLE_FILTER_BAR
  };
};

export const getClassesFailure = data => {
  return {
    type: FETCHING_CLASSES_FAILURE,
    error: data,
    receivedAt: Date.now()
  };
};

export const updateClassFilters = classes => {
  return {
    type: CLASS_FILTERS_UPDATED,
    classFilter: classes
  };
};

export const updateGymFilters = gym => {
  return {
    type: GYM_FILTERS_UPDATED,
    gymFilter: gym
  };
};

export const updateAllFilters = filters => {
  return {
    type: ALL_FILTERS_UPDATED,
    filters: filters
  };
};

export const getClassesSuccess = classes => {
  return {
    type: FETCHING_CLASSES_SUCCESS,
    classes: classes,
    receivedAt: Date.now()
  };
};
