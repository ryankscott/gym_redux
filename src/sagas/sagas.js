import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR,
  ALL_FILTERS_UPDATED,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED
} from "../actions/actions.js";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(FETCHING_CLASSES, workerSaga);
}

// TODO: Fix the fetch to catch errors
// function that makes the api request and returns a Promise for response
export const fetchClasses = searchQuery => {
  return axios({
    method: "get",
    crossDomain: true,
    url: __BACKEND_URL__ + "classsearch/?q=" + searchQuery
  });
};

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(payload) {
  try {
    const response = yield call(fetchClasses, payload.query);
    const classes = response.data.classes;
    const query = response.data.query;

    // dispatch a success action to the store with the new classes
    yield put({ type: "FETCHING_CLASSES_SUCCESS", classes });

    yield put({ type: "ALL_FILTERS_UPDATED", filters: query });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "FETCHING_CLASSES_FAILURE", error });
  }
}
