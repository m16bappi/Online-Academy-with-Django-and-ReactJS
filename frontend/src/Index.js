import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { HashRouter as Router} from 'react-router-dom';


import { Provider } from 'react-redux';
import store from '../store';
import { USER_LOADING } from '../store/Actions/Auth/Login'

class App extends Component {
  componentDidMount() {
    store.dispatch(USER_LOADING())
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>

          </Fragment>
        </Router>
      </Provider>
    )
  }
}

export default App;

const container = document.getElementById("root");
render(<App />, container);