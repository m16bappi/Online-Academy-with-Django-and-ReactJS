import * as Types from '../../Types/Types';
import Axios from 'axios';

export const USER_REGISTER = (username, email, password) => dispatch => {
    Axios.post(`api/auth/register/`, {username, email, password})
    .then(res => {
        dispatch({
            type: Types.REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => console.log(err))
};
