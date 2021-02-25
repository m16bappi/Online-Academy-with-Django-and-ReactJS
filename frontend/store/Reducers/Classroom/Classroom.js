import * as Type from "../../Types/ClassroomTypes";
import {USER_LOGOUT} from "../../Types/AuthTypes";

const initialState = {
    classroomList: [],
    teacher_classroom: [],
    myclassroomlist: [],
    classroom: {},
    examlist: [],
    questions: [],
    exam_participants: [],
    assignments: [],
    assignment_submit: [],
    stream: {
        streams: [],
        comments: []
    }
}

export default function (state=initialState, action) {
    switch (action.type){
        case Type.GET_CLASSROOM_LIST:
        {
            return {
                ...state,
                classroomList: action.payload
            }
        }
        case Type.GET_MY_CLASSROOM_LIST:
        {
            return {
                ...state,
                myclassroomlist: action.payload
            }
        }
        case Type.TEACHER_CLASSROOM:
        {
            return {
                ...state,
                teacher_classroom: action.payload
            }
        }
        case Type.GET_CLASSROOMS:
        {
            return {
                ...state,
                ...action.payload
            }
        }
        case Type.GET_EXAM_LIST:
        {
            return {
                ...state,
                examlist: action.payload
            }
        }
        case Type.GET_QUESTIONS:
        {
            return {
                ...state,
                questions: action.payload
            }
        }

        case Type.POST_PARTICIPANTS:
        {
            return {
                ...state,
                examlist: state.examlist.map(item=>{
                    if (item.id === action.exam_id){
                        item["submitted"].push(action.user)
                    }
                    return item
                }),
                participants: [...state.participants, action.payload]
            }
        }
        case Type.PARTICIPANTS_LIST:
        {
            return {
                ...state,
                participants: action.payload
            }
        }
        case Type.GET_ASSIGNMENTS:
        {
            return {
                ...state,
                assignments: action.payload
            }
        }
        case Type.POST_ASSIGNMENT_ANSWER:
        {
            return {
                ...state,
                assignments: state.assignments.map(item=> {
                    if(item.id === action.payload.assignment){
                        item["submitted"].push(action.payload.student_name)
                    }
                    return item
                }),
                assignment_submit: [...state.assignment_submit, action.payload]
            }
        }
        case Type.GET_STREAM:
        {
            return {
                ...state,
                stream: {
                    ...state.stream,
                    streams: action.payload
                }
            }
        }
        case Type.GET_STREAM_COMMENT:
        {
            return {
                ...state,
                stream: {
                    ...state.stream,
                    comments: action.payload
                }
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
                teacher_classroom: [],
                exam_participants: [],
                assignments: [],
                assignment_submit: [],
                stream: {
                    streams: [],
                    comments: []
                }
            }
        }
        default:
            return state
    }
}
