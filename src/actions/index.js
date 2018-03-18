import { FETCHING_CLASSES } from "./actiontypes";

export const getClasses = query => {
  console.log("Actions - getClasses data:" + query);
  return {
    type: FETCHING_CLASSES,
    query
  };
};
