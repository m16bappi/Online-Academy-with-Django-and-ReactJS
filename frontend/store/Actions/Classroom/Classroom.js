import Axios from "axios";
import Cookies from "js-cookie"
import {GET_CLASSROOM, GET_MY_CLASSROOM} from "../../Types/ClassroomTypes";

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
            'Authorization': `Token ${getState().Auth.token}`
        }
    }
}


export const GET_CLASSROOMS_LIST = (program, intake) => (dispatch) => {
    Axios.post(`api/classroom/intakeClassroomList/`, {program, intake}, CONFIG())
        .then(res => {
            dispatch({
                type: GET_CLASSROOM,
                payload: res.data
            })
        }).catch(error => console.log(error.data))
}

export const GET_MY_CLASSROOMS = () => (dispatch, getState) => {
    Axios.get(`api/classroom/myclassroom/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: GET_MY_CLASSROOM,
                payload: res.data
            })
        }) .catch(error => console.log(error))
}
