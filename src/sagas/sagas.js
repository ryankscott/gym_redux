import 'regenerator-runtime/runtime';
import { select, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import map from 'lodash/map';
import get from 'lodash/get';
import join from 'lodash/join';
import setDay from 'date-fns/setDay';
import format from 'date-fns/format';

import {
  FETCHING_ALL_CLASSES,
  GYM_FILTERS_UPDATED,
  CLASS_FILTERS_UPDATED,
  DATE_FILTERS_UPDATED,
  TIME_FILTERS_UPDATED,
  VIRTUAL_CLASSES_FILTERS_UPDATED,
  CLEAR_ALL_FILTERS,
  LOAD_FILTERS,
  FETCHING_CLASSTYPES,
} from '../actions/actions';

const queryString = require('query-string');

const filters = state => state.filters;

const createQueryString = state => {
  /* name="BodyPump, RPM"&club="Auckland City"&date="2018-07-18,2018-07-19"&hour=11 */

  const q = {};

  const d = get(state, 'date');
  const dates = d ? Object.values(d) : [];
  const x = dates.map(ds => format(ds, 'yyyy-MM-dd'));
  q.date = join(x, ',');

  const c = get(state, 'gym');
  const clubs = map(c, cs => cs.value);
  q.club = join(clubs, ',');

  const n = get(state, 'class');
  const names = map(n, ns => ns.value);
  q.name = join(names, ',');

  const t = get(state, 'time');
  let ts = t ? Object.values(t) : [];
  let times = ts.map(t => t.split(','));
  times = times.flat();

  q.hour = join(times, ',');

  const v = get(state, 'virtualClasses');
  q.virtual = v;

  return queryString.stringify(q, { encode: false });
};

// function that makes the api request and returns a Promise for response
export const fetchClasses = searchQuery =>
  axios({
    method: 'get',
    crossDomain: true,
    url: `${__BACKEND_URL__}classes/?${searchQuery}`,
  });

export const fetchClasstypes = () =>
  axios({
    method: 'get',
    crossDomain: true,
    url: `${__BACKEND_URL__}classtypes/`,
  });

function* classtypeSaga() {
  try {
    const response = yield call(fetchClasstypes);
    const ct = response.data;
    const classtypes = ct.map(c => ({ value: c.Key, label: c.Value }));

    yield put({
      type: 'FETCHING_CLASSTYPES_SUCCESS',
      fetching: false,
      classtypes,
    });
  } catch (error) {
    yield put({
      type: 'FETCHING_CLASSTYPES_FAILURE',
      error,
    });
  }
}

function* classSaga() {
  yield put({
    type: 'FETCHING_CLASSES',
    fetching: true,
    error: null,
  });
  const allFilters = yield select(filters);
  const qs = createQueryString(allFilters);

  try {
    const response = yield call(fetchClasses, qs);
    const classes = response.data;

    yield put({
      type: 'FETCHING_CLASSES_SUCCESS',
      classes,
    });
  } catch (error) {
    yield put({
      type: 'FETCHING_CLASSES_FAILURE',
      error,
    });
  }
}

export function* watcherSaga() {
  yield takeLatest(
    [
      FETCHING_ALL_CLASSES,
      GYM_FILTERS_UPDATED,
      CLASS_FILTERS_UPDATED,
      DATE_FILTERS_UPDATED,
      TIME_FILTERS_UPDATED,
      VIRTUAL_CLASSES_FILTERS_UPDATED,
      CLEAR_ALL_FILTERS,
      LOAD_FILTERS,
    ],
    classSaga,
  );

  yield takeLatest([FETCHING_CLASSTYPES], classtypeSaga);
}
