import * as Types from '../../Types/AuthTypes';
import Axios from 'axios';
import Cookies from "js-cookie";

const csrftoken = Cookies.get('csrftoken');

const register_config = () => {
    return {
        headers: {
            'Content-Type': ['multipart/form-data', 'application/json'],
            'X-CSRFToken': csrftoken
        }
    }
}

export const user_register = (data) => dispatch => {
    Axios.post(`api/auth/register/`, data, register_config())
    .then(res => {
        dispatch({
            type: Types.REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => console.log(err))
};
