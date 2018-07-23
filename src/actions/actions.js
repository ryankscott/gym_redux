export const FETCHING_CLASSES = "FETCHING_CLASSES";
export const FETCHING_CLASSES_SUCCESS = "FETCHING_CLASSES_SUCCESS";
export const FETCHING_CLASSES_FAILURE = "FETCHING_CLASSES_FAILURE";
export const TOGGLE_FILTER_BAR = "TOGGLE_FILTER_BAR";
export const ANY_FILTER_UPDATED = "ANY_FILTER_UPDATED";
export const GYM_FILTERS_UPDATED = "GYM_FILTERS_UPDATED";
export const CLASS_FILTERS_UPDATED = "CLASS_FILTERS_UPDATED";
export const DATE_FILTERS_UPDATED = "DATE_FILTERS_UPDATED";
export const TIME_FILTERS_UPDATED = "TIME_FILTERS_UPDATED";

const queryString = require("query-string");

export const getClasses = query => {
  /* name="BodyPump, RPM"&club="Auckland City"&before="2018-07-18T19:00Z12:00&after="2018-07-18T20:00Z12:00 */
  let q = {};
  const c = _.get(query, "Gym");
  const clubs = _.map(c, cs => {
    return cs.value;
  });
  q.club = _.join(clubs, ",");

  const n = _.get(query, "Class");
  const names = _.map(n, ns => {
    return ns.value;
  });
  q.name = _.join(names, ",");

  const b = _.get(query, "Before");
  q.before = b ? b.toISOString() : "";

  const a = _.get(query, "After");
  q.after = a ? a.toISOString() : "";

  console.log(q);

  return {
    type: FETCHING_CLASSES,
    query: queryString.stringify(q)
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

export const updateDateFilters = (beforeDate, afterDate) => {
  return {
    type: DATE_FILTERS_UPDATED,
    beforeDate: beforeDate,
    afterDate: afterDate
  };
};

export const updateAnyFilter = filters => {
  return {
    type: ANY_FILTER_UPDATED,
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
