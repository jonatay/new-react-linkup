import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./mid/reducers";
import { routerMiddleware } from "connected-react-router";
import rootSaga from "./mid/sagas";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

// const enhancer = composeEnhancers(applyMiddleware(saga));
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
        sagaMiddleware
      )
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
}

// //redux dev tool
// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const store = createStore(reducers, enhancer);

// saga.run(sagas);

// export default store;
