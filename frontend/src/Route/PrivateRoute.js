import React from "react";
import {Redirect, Route} from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={
        props => {
            if (!auth.token) {
                return <Redirect to='/' />
            } else {
                return <Component {...props} />;
            }
        }
    } />
);

const mapStateToProps = state => ({
    auth: state.Auth
})

export default connect(mapStateToProps)(PrivateRoute)
