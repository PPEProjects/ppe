import React, { Suspense } from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from "./App";
import rootReducer from "./slices";

window.$api = process.env.REACT_APP_API_URL
window.$asset = process.env.REACT_APP_ASSET_URL
window.$admin = process.env.REACT_APP_ADMIN_URL
window.$home = process.env.REACT_APP_HOME_URL

const store = configureStore({ reducer: rootReducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
