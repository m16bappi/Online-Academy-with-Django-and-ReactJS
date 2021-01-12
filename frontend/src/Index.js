import { render } from "react-dom";
import React, { Component, Fragment } from "react";
import { HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import {CssBaseline, ThemeProvider} from "@material-ui/core";

import { USER_LOADING } from '../store/Actions/Auth/Login'
import store from '../store';
import {theme} from '../Themes/Themes'


import Home from "./Home/Home";


class App extends Component {
  componentDidMount() {
    store.dispatch(USER_LOADING())
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Fragment>
              <CssBaseline />
              <Home />
            </Fragment>
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

const container = document.getElementById("root");
render(<App />, container);