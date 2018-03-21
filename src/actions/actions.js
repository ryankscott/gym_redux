import { FETCHING_CLASSES } from "./actiontypes";

export const getClasses = query => {
  console.log("Actions - getClasses data:" + query);
  return {
    type: FETCHING_CLASSES,
    query
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
