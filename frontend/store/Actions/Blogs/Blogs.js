import Axios from 'axios';
import {GET_BLOG, ADD_BLOG, DELETE_BLOG} from '../../Types/BlogTypes';
import Cookies from "js-cookie";

const csrftoken = Cookies.get('csrftoken');

const CONFIG = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }
}

const TOKEN_CONFIG = (getState) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': `Token ${getState().Auth.token}`
        }
    }
}

const FILE_UPLOAD_CONFIG = (getState) => {
    return {
        headers: {
            'Content-Type': ['multipart/form-data', 'application/json'],
            'Authorization': `Token ${getState().Auth.token}`,
            'X-CSRFToken': csrftoken
        }
    }
}


export const GET_BLOGS = () => dispatch => {
    Axios.get('api/blogs_list/')
        .then(res => {
            dispatch({
                type: GET_BLOG,
                payload: res.data
            })
        }).catch(err => console.log(err))
};

export const ADD_BLOGS = (blog) => (dispatch, getState) => {
    console.log(blog)
    Axios.post('api/add_blog/', blog, FILE_UPLOAD_CONFIG(getState))
        .then(res => {
            dispatch({
                type: ADD_BLOG,
                payload: res.data
            })
        }).catch(err => console.log(err))
};

export const DELETE_BLOGS = (id) => (dispatch, getState) => {
    Axios.delete(`api/blogs/delete/${id}/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: DELETE_BLOG,
                payload: id
            })
        }).catch(err => console.log(err))
};
