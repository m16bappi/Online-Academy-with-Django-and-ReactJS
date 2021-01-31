import {GET_INTAKE_CLASSROOM_LIST, GET_MY_CLASSROOM_LIST, GET_QUESTIONS,
    GET_CLASSROOMS, GET_EXAM_LIST, PARTICIPANTS_LIST, POST_PARTICIPANTS,
    GET_ASSIGNMENTS, POST_ASSIGNMENT_ANSWER} from "../../Types/ClassroomTypes";

import {USER_LOGOUT} from "../../Types/AuthTypes";

const initialState = {
    intakeclassroomlist: [],
    myclassroomlist: [],
    classroom: {},
    examlist: [],
    questions: [],
    exam_participants: [],
    assignments: [],
    assignment_submit: []
}

export default function (state=initialState, action) {
    switch (action.type){
        case GET_INTAKE_CLASSROOM_LIST:
        {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_MY_CLASSROOM_LIST:
        {
            return {
                ...state,
                myclassroomlist: action.payload
            }
        }
        case GET_CLASSROOMS:
        {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_EXAM_LIST:
        {
            return {
                ...state,
                examlist: action.payload
            }
        }
        case GET_QUESTIONS:
        {
            return {
                ...state,
                questions: action.payload
            }
        }

        case POST_PARTICIPANTS:
        {
            return {
                ...state,
                examlist: state.examlist.map(item=>{
                    if (item.id === action.exam_id){
                        item.submitted.push(action.user)
                    }
                    return item
                }),
                participants: [...state.participants, action.payload]
            }
        }
        case PARTICIPANTS_LIST:
        {
            return {
                ...state,
                participants: action.payload
            }
        }
        case GET_ASSIGNMENTS:
        {
            return {
                ...state,
                assignments: action.payload
            }
        }
        case POST_ASSIGNMENT_ANSWER:
        {
            return {
                ...state,
                assignments: state.assignments.map(item=> {
                    if(item.id === action.id){
                        item.submitted.push(action.user)
                    }
                    return item
                }),
                assignment_submit: [...state.assignment_submit, action.payload]
            }
        }
        case USER_LOGOUT:
        {
            return {
                ...state,
                myclassroomlist: [],
                classroom: {},
                examlist: [],
                questions: [],
                exam_participants: [],
                assignments: [],
                assignment_submit: []
            }
        }
        default:
            return state
    }
}
