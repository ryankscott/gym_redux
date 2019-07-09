import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import mixpanel from 'mixpanel-browser';
import App from './components/App';
import reducer from './reducers/reducers';
import { watcherSaga } from './sagas/sagas';
import 'react-virtualized/styles.css';
import { loadState, saveState } from './localstorage';
import freezeState from 'redux-freeze-state';
import { identifyUser, identifySession } from './analytics';

// SW
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw.js')
      .then(registration => {})
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Init analytics
identifyUser();
identifySession();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = __PRODUCTION__
  ? compose()
  : compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
const persistedState = loadState();
const store = createStore(
  __PRODUCTION__ ? reducer : freezeState(reducer),
  persistedState,
  compose(
    applyMiddleware(sagaMiddleware),
    enhancer,
  ),
);

// State persistence
store.subscribe(() => {
  saveState(store.getState());
});

// run the saga
sagaMiddleware.run(watcherSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
