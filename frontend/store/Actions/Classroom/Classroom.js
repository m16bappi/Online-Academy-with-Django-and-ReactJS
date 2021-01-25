import Axios from "axios";
import Cookies from "js-cookie"
import {GET_CLASSROOM} from "../../Types/ClassroomTypes";

const csrftoken = Cookies.get('csrftoken');

const TOKEN_CONFIG = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }
};


export const GET_CLASSROOMS = (program, intake) => (dispatch) => {
    Axios.post(`api/classroom/intakeClassroomList/`, {program, intake}, TOKEN_CONFIG())
        .then(res => {
            dispatch({
                type: GET_CLASSROOM,
                payload: res.data
            })
        }).catch(error => console.log(error.data))
}
