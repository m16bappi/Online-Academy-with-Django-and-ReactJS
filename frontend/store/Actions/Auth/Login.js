import * as Types from '../../Types/AuthTypes';
import Axios from 'axios';
import Cookies from "js-cookie";

const csrftoken = Cookies.get('csrftoken')

const CONFIG = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }
}

export const LOGIN_FAILD = (error) => dispatch => {
    console.log(error);
    dispatch({
        type: Types.LOGIN_FAILD
    })
};

export const USER_LOADING = () => (dispatch, getState) => {
    dispatch({ type: Types.LOGIN_START });
    Axios.get(`api/auth/user/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Types.USER_LOADED,
                payload: res.data
            })
        }).catch(error => console.log(error))
};

export const USER_LOGIN = (username, password) => dispatch => {
    Axios.post(`api/auth/login/`, { username, password }, CONFIG())
        .then(res => {
            dispatch({
                type: Types.LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => console.log(err));
};

export const USER_LOGOUT = () => (dispatch, getState) => {
    Axios.post(`api/auth/logout/`, null, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Types.USER_LOGOUT,
                payload: res.data
            })
        })
};

export const TOKEN_CONFIG = getState => {
    const token = getState().Auth.token
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
};
