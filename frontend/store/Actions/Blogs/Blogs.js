import Axios from 'axios';
import { GET_BLOG, ADD_BLOG, DELETE_BLOG } from '../../Types/BlogTypes';

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
    Axios.post('api/add_blog/', blog, TOKEN_CONFIG(getState))
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

export const TOKEN_CONFIG = getState => {
    const token = getState().Login.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
};

