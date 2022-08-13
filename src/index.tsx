import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@mui/material/styles";
import { MuiTheme } from "./assets/material-ui";
import Notification from "./components/uikit/notification/Notification";
import App from "./App";
// リセットCSS
import "./assets/styles/reset.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Notification />
      <ThemeProvider theme={MuiTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
