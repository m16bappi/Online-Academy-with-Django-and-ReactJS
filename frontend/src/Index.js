import { render } from "react-dom";
import React, { Component, Fragment} from "react";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import {CssBaseline, ThemeProvider} from "@material-ui/core";

import { USER_LOADING } from '../store/Actions/Auth/Login';
import {get_programs, get_intakes} from "../store/Actions/Program/Program";
import {get_classroom_list} from "../store/Actions/Classroom/Classroom";
import store from '../store';
import {theme} from '../Themes/Themes'


import Home from "./Home/Home";
import Programs from "./Programs/Programs";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import ClassroomList from "./Classroom/ClassroomList/ClassroomList";
import MyClassroom from "./Classroom/MyClassroomList/MyClassroomList";
import Classroom from "./Classroom/Classroom/Classroom";
import PrivateRoute from "./Route/PrivateRoute";

class App extends Component {
  componentDidMount() {
    store.dispatch(USER_LOADING())
    store.dispatch(get_programs())
    store.dispatch(get_intakes())
    store.dispatch(get_classroom_list())
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
                <PrivateRoute exact path='/myClassroom/:id' component={Classroom}/>
                <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                <PrivateRoute exact path='/dashboard/:id' component={Classroom}/>
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