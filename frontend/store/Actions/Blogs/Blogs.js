import Axios from 'axios';
import { GET_BLOG, ADD_BLOG, DELETE_BLOG } from '../../Types/Types';

export const GET_BLOGS = () => dsipatch => {
    Axios.get('api/blogs_list/')
        .then(res => {
            dsipatch({
                type: GET_BLOG,
                payload: res.data
            })
        }).catch(err => console.log(err))
};

export const ADD_BLOGS = (blog) => (dsipatch, getState) => {
    console.log(blog)
    Axios.post('api/add_blog/', blog, TOKEN_CONFIG(getState))
        .then(res => {
            dsipatch({
                type: ADD_BLOG,
                payload: res.data
            })
        }).catch(err => console.log(err))
};

export const DELETE_BLOGS = (id) => (dsipatch, getState) => {
    Axios.delete(`api/blogs/delete/${id}/`, TOKEN_CONFIG(getState))
        .then(res => {
            dsipatch({
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

