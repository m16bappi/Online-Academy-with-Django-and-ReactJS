import Axios from "axios";
import Cookies from "js-cookie"
import {GET_INTAKE_CLASSROOM_LIST, GET_MY_CLASSROOM_LIST, GET_CLASSROOMS, GET_EXAM_LIST, GET_QUESTIONS} from "../../Types/ClassroomTypes";

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
                type: GET_INTAKE_CLASSROOM_LIST,
                payload: res.data
            })
        }).catch(error => console.log(error.data))
}

export const GET_MY_CLASSROOMS_LIST = () => (dispatch, getState) => {
    Axios.get(`api/classroom/myclassroomlist/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: GET_MY_CLASSROOM_LIST,
                payload: res.data
            })
        }) .catch(error => console.log(error))
}

export const GET_CLASSROOM = (classroom) => (dispatch, getState) => {
    Axios.get(`api/classroom/${classroom}/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: GET_CLASSROOMS,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const getExamList = (classroom) => (dispatch, getState) => {
    Axios.get(`api/classroom/exam/list/${classroom}/`, TOKEN_CONFIG(getState))
        .then(res=>{
            dispatch({
                type: GET_EXAM_LIST,
                payload: res.data
            })
        })
}

export const getQuestions = (classroom, exam) => (dispatch, getState) => {
    Axios.get(`api/classroom/exam/questions/${classroom}/${exam}/`, TOKEN_CONFIG(getState))
        .then(res=> {
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data
            })
        }).catch(e=>console.log(e))
}
