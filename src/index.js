import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./reducers/reducers";
import { watcherSaga } from "./sagas/sagas";
import "react-virtualized/styles.css";
import mixpanel from "mixpanel-browser";
import { loadState, saveState } from "./localStorage";

// Mixpanel
mixpanel.init("dc8b3c403625120c86c74674c52c3b80", {
  api_host: "https://api.mixpanel.com",
  debug: true
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = __PRODUCTION__
  ? compose()
  : compose(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  compose(applyMiddleware(sagaMiddleware), enhancer)
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
  document.getElementById("root")
);
