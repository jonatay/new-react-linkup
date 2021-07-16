import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore, { history } from "./configureStore";
import { ConnectedRouter } from "connected-react-router";
import { initAuth } from "./mid/common/auth";

// import "antd/dist/antd.css";
import "./index.css";

const initialState = {};
const store = configureStore(initialState);

function render(Component) {
  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    // </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

initAuth(store.dispatch)
  .then(() => render(App))
  .catch((error) => console.error(error));
