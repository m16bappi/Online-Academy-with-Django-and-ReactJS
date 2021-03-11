import Axios from "axios";
import Cookies from "js-cookie"
import * as Type from "../../Types/ClassroomTypes";

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

export const get_classroom_list = () => (dispatch) => {
    Axios.get(`api/classroom/list/`)
        .then(res => {
            dispatch({
                type: Type.GET_CLASSROOM_LIST,
                payload: res.data
            })
        }).catch(error => console.log(error.data))
}

export const GET_MY_CLASSROOMS_LIST = () => (dispatch, getState) => {
    Axios.get(`api/classroom/myclassroomlist/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.GET_MY_CLASSROOM_LIST,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const GET_CLASSROOM = (id) => (dispatch, getState) => {
    Axios.get(`api/classroom/${id}/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.GET_CLASSROOMS,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const create_classroom = (data) => (dispatch, getState) => {
    Axios.post(`api/classroom/create/`, data, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.CREATE_CLASSROOMS,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const join_classroom = (id, code) => (dispatch, getState) => {
    Axios.post(`api/classroom/join/`, {id, code}, TOKEN_CONFIG(getState))
        .then((res) => {
            dispatch({
                type: Type.JOIN_CLASSROOM,
                payload: {
                    id: id,
                    username: getState().Auth.user.username
                }
            })
        }).catch(error => console.log(error))
}

export const createExam = (exam, qsnSet, date) => (dispatch, getState) =>{
    Axios.post(`api/classroom/exam/create/`, {exam, qsnSet, date}, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.CREATE_EXAM,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const getExamList = (classroom) => (dispatch, getState) => {
    Axios.get(`api/classroom/exam/list/${classroom}/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.GET_EXAM_LIST,
                payload: res.data
            })
        })
}

export const getQuestions = (classroom, exam) => (dispatch, getState) => {
    Axios.get(`api/classroom/exam/questions/${classroom}/${exam}/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.GET_QUESTIONS,
                payload: res.data
            })
        }).catch(e => console.log(e))
}

export const postAssignmentParticipants = (exam_id, obtain_marks) => (dispatch, getState) => {
    Axios.post(`api/classroom/exam/list/participants/`, {exam_id, obtain_marks}, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.POST_PARTICIPANTS,
                payload: res.data,
                user: getState().Auth.user.username,
                exam_id: exam_id
            })
        }).catch(e => console.log(e))
}

export const getAssignmentParticipants = (id) => (dispatch) => {
    Axios.get(`api/classroom/exam/list/participants/${id}/`, CONFIG())
        .then(res => {
            dispatch({
                type: Type.PARTICIPANTS_LIST,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const get_assignments = (classroom) => dispatch => {
    Axios.get(`api/classroom/assignment/list/${classroom}/`, CONFIG())
        .then(res => {
            dispatch({
                type: Type.GET_ASSIGNMENTS,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const post_assignment_answer = (data) => (dispatch, getState) => {
    Axios.post(`api/classroom/assignment/participant/`, data, FILE_UPLOAD_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.POST_ASSIGNMENT_ANSWER,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const get_stream = (id) => (dispatch) => {
    Axios.get(`api/classroom/stream/list/${id}/`)
        .then(res => {
            dispatch({
                type: Type.GET_STREAM,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const post_stream = (textarea, id) => (dispatch, getState) => {
    Axios.post(`api/classroom/stream/create/`, {textarea, id}, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.POST_STREAM,
                payload: res.data
            })
        }).catch(error => console.log(error))
}


export const get_stream_comment = (id) => dispatch => {
    Axios.get(`api/classroom/stream/comment/list/${id}/`)
        .then(res => {
            dispatch({
                type: Type.GET_STREAM_COMMENT,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const post_stream_comment = (data) => (dispatch, getState) => {
    Axios.post(`api/classroom/stream/comment/create/`, data, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.POST_STREAM_COMMENT,
                payload: res.data
            })
        }).catch(error => console.log(error))
}

export const get_teacher_classroom = () => (dispatch, getState) => {
    Axios.get(`api/classroom/teacher/`, TOKEN_CONFIG(getState))
        .then(res => {
            dispatch({
                type: Type.TEACHER_CLASSROOM,
                payload: res.data
            })
        }).catch(error => console.log(error))
}
