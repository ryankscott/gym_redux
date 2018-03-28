import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR
} from "./actiontypes";

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
    error: data, //TODO:Fixme
    receivedAt: Date.now()
  };
};

export const getClassesSuccess = data => {
  return {
    type: FETCHING_CLASSES_SUCCESS,
    classes: data, //TODO:Fixme
    receivedAt: Date.now()
  };
};
