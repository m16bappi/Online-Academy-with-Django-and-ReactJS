import Axios from "axios";
import Cookies from "js-cookie"
import {GET_INTAKE_CLASSROOM_LIST, GET_MY_CLASSROOM_LIST, GET_CLASSROOMS, GET_EXAM_LIST,
    GET_QUESTIONS, PARTICIPANTS_LIST, POST_PARTICIPANTS, GET_ASSIGNMENTS, POST_ASSIGNMENT_ANSWER,
    GET_STREAM, POST_STREAM, GET_STREAM_COMMENT, POST_STREAM_COMMENT
} from "../../Types/ClassroomTypes";

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

const FILE_UPLOAD_CONFIG = (getState) => {
    return {
        headers: {
            'Content-Type': ['multipart/form-data', 'application/json'],
            'Authorization': `Token ${getState().Auth.token}`,
            'X-CSRFToken': csrftoken
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

export const GET_CLASSROOM = (id) => (dispatch, getState) => {
    Axios.get(`api/classroom/${id}/`, TOKEN_CONFIG(getState))
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

export const postParticipants = (exam_id, obtain_marks) => (dispatch, getState) => {
    Axios.post(`api/classroom/exam/list/participants/`, {exam_id, obtain_marks}, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: POST_PARTICIPANTS,
                payload: res.data,
                user: getState().Auth.user.username,
                exam_id: exam_id
            })
        }).catch(e=>console.log(e))
}

export const participantsList = (id) => (dispatch) => {
    Axios.get(`api/classroom/exam/list/participants/${id}/`, CONFIG())
        .then(res => {
            dispatch({
                type: PARTICIPANTS_LIST,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const get_assignments = (classroom) => dispatch => {
    Axios.get(`api/classroom/assignment/list/${classroom}/`, CONFIG())
        .then(res => {
            dispatch({
                type: GET_ASSIGNMENTS,
                payload: res.data
            })
        }) .catch(error => console.log(error))
}

export const post_assignment_answer = (data) => (dispatch, getState) => {
    Axios.post(`api/classroom/assignment/participant/`, data, FILE_UPLOAD_CONFIG(getState))
        .then(res => {
            dispatch({
                type: POST_ASSIGNMENT_ANSWER,
                payload: res.data,
                user: getState().Auth.user.username,
                id: data.id
            })
        }) .catch(error => console.log(error))
}

export const get_stream = (id) => (dispatch) => {
    Axios.get(`api/classroom/stream/list/${id}/`)
        .then(res => {
            dispatch({
                type: GET_STREAM,
                payload: res.data
            })
        }) .catch(error => console.log(error))
}

/*
export const post_stream = () => dispatch => {
    Axios.get(``)
        .then(res => {
            dispatch({
                type: POST_STREAM,
                payload: res.data
            })
        }).catch(error => console.log(error))
}
*/

export const get_stream_comment = (id) => dispatch => {
    Axios.get(`api/classroom/stream/comment/list/${id}/`)
        .then(res => {
            dispatch({
                type: GET_STREAM_COMMENT,
                payload: res.data
            })
        }).catch(error => console.log(error))
}
