// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./app.js";

const app = document.getElementById("app");

if (app) {
    ReactDOM.render(<App/>, app);
}
