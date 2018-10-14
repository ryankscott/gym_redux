import { select, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED,
  TIME_FILTERS_UPDATED,
  CLEAR_ALL_FILTERS
} from "../actions/actions.js";
const queryString = require("query-string");

const filters = state => state.filters.filters;

const createQueryString = filters => {
  /* name="BodyPump, RPM"&club="Auckland City"&date="2018-07-18,2018-07-19"&hour=11 */
  let q = {};
  const c = _.get(filters, "gym");
  const clubs = _.map(c, cs => {
    return cs.value;
  });
  q.club = _.join(clubs, ",");

  const n = _.get(filters, "class");
  const names = _.map(n, ns => {
    return ns.value;
  });
  q.name = _.join(names, ",");

  // TODO: Support multiple dates
  const d = _.get(filters, "date");
  q.date = d ? d.date : "";

  const t = _.get(filters, "time");
  q.hour = t ? t.hours : "";

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
      CLEAR_ALL_FILTERS
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
function* workerSaga(payload) {
  const allFilters = yield select(filters);
  const queryString = createQueryString(allFilters);
  try {
    const response = yield call(fetchClasses, queryString);
    const classes = response.data;

    // dispatch a success action to the store with the new classes
    yield put({ type: "FETCHING_CLASSES_SUCCESS", classes });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "FETCHING_CLASSES_FAILURE", error });
  }
}
