import { select, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import map from "lodash/map";
import get from "lodash/get";
import join from "lodash/join";

import {
  FETCHING_CLASSES,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED,
  TIME_FILTERS_UPDATED,
  CLEAR_ALL_FILTERS,
  LOAD_FILTERS
} from "../actions/actions.js";
const queryString = require("query-string");

const filters = state => state.filters;

const createQueryString = filters => {
  /* name="BodyPump, RPM"&club="Auckland City"&date="2018-07-18,2018-07-19"&hour=11 */
  let q = {};
  const c = get(filters, "gym");
  const clubs = map(c, cs => {
    return cs.value;
  });
  q.club = join(clubs, ",");

  const n = get(filters, "class");
  const names = map(n, ns => {
    return ns.value;
  });
  q.name = join(names, ",");

  const d = get(filters, "date");
  const dates = map(d, ds => {
    return ds.date;
  });
  q.date = join(dates, ",");

  const t = get(filters, "time");
  const times = map(t, ts => {
    return ts.hours;
  });
  q.hour = join(times, ",");
  return queryString.stringify(q);
};

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(
    [
      FETCHING_CLASSES,
      GYM_FILTERS_UPDATED,
      CLASS_FILTERS_UPDATED,
      DATE_FILTERS_UPDATED,
      TIME_FILTERS_UPDATED,
      CLEAR_ALL_FILTERS,
      LOAD_FILTERS
    ],
    workerSaga
  );
}

// TODO: Fix the fetch to catch errors
// function that makes the api request and returns a Promise for response
export const fetchClasses = searchQuery => {
  return axios({
    method: "get",
    crossDomain: true,
    url: __BACKEND_URL__ + searchQuery
  });
};

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  const allFilters = yield select(filters);
  const queryString = createQueryString(allFilters);
  try {
    const response = yield call(fetchClasses, queryString);
    const classes = response.data;

    // dispatch a success action to the store with the new classes
    yield put({
      type: "FETCHING_CLASSES_SUCCESS",
      classes
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: "FETCHING_CLASSES_FAILURE",
      error
    });
  }
}
