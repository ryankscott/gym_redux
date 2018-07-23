import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS,
  TOGGLE_FILTER_BAR,
  ANY_FILTER_UPDATED
} from "../actions/actions.js";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(FETCHING_CLASSES, workerSaga);
  yield takeLatest(ANY_FILTER_UPDATED, workerSaga);
}

// TODO: Fix the fetch to catch errors
// function that makes the api request and returns a Promise for response
export const fetchClasses = searchQuery => {
  return axios({
    method: "get",
    crossDomain: true,
    url: __PRODUCTION__ ? __BACKEND_URL__ + searchQuery : __BACKEND_URL__
  });
};

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(payload) {
  console.log(payload);
  try {
    const response = yield call(fetchClasses);
    const classes = response.data;

    // dispatch a success action to the store with the new classes
    yield put({ type: "FETCHING_CLASSES_SUCCESS", classes });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "FETCHING_CLASSES_FAILURE", error });
  }
}
