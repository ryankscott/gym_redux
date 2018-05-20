import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./reducers/reducers";
import { watcherSaga } from "./sagas/sagas";
import "react-virtualized/styles.css";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// run the saga
sagaMiddleware.run(watcherSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
