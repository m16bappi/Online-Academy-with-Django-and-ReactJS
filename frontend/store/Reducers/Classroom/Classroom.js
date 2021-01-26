import {GET_INTAKE_CLASSROOM_LIST, GET_MY_CLASSROOM_LIST, GET_CLASSROOMS} from "../../Types/ClassroomTypes";

const initialState = {
    intakeclassroomlist: [],
    myclassroomlist: [],
    classroom: {}
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
        default:
            return state
    }
}
