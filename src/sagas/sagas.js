import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
//TODO: remove axios and replace with fetch
import {
  FETCHING_CLASSES,
  FETCHING_CLASSES_FAILURE,
  FETCHING_CLASSES_SUCCESS
} from "../actions/actiontypes";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(FETCHING_CLASSES, workerSaga);
}

// function that makes the api request and returns a Promise for response
export const fetchClasses = searchQuery => {
  return axios({
    method: "get",
    crossDomain: true,
    url: __GYMCLASS_URL__ + "/classsearch/?q=" + searchQuery
  });
};

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(payload) {
  try {
    const response = yield call(fetchClasses, payload.query);
    const classes = response.data;

    // dispatch a success action to the store with the new classes
    yield put({ type: "FETCHING_CLASSES_SUCCESS", classes });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "FETCHING_CLASSES_FAILURE", error });
  }
}
