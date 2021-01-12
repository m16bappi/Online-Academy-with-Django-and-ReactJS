import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Blogs from './components/Blogs/Blogs';
import BlogDetails from './components/Blogs/BlogDetails/BlogDetails'
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
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/blogs" component={Blogs} />
              <Route path="/blogs/:id" component={BlogDetails} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    )
  }
}

export default App;

const container = document.getElementById("root");
render(<App />, container);