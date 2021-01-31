import { render } from "react-dom";
import React, { Component, Fragment} from "react";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import {CssBaseline, ThemeProvider} from "@material-ui/core";

import { USER_LOADING } from '../store/Actions/Auth/Login'
import store from '../store';
import {theme} from '../Themes/Themes'


import Home from "./Home/Home";
import Programs from "./Programs/Programs";
import Header from "./Header/Header";
import ClassroomList from "./Classroom/ClassroomList/ClassroomList";
import MyClassroom from "./Classroom/MyClassroomList/MyClassroomList";
import Classroom from "./Classroom/Classroom/Classroom";
import PrivateRoute from "./Route/PrivateRoute";


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
              <Header />
              <Switch>
                <Route exact path='/' component={Home}/>
                <PrivateRoute exact path='/myClassroom' component={MyClassroom}/>
                <PrivateRoute exact path='/myClassroom/:className' component={Classroom} />
                <Route exact path='/programs' component={Programs}/>
                <Route exact path='/programs/:name' component={ClassroomList}/>
              </Switch>
            </Fragment>
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

const container = document.getElementById("root");
render(<App />, container);