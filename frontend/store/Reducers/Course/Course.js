import * as Type from "../../Types/CourseTypes";

const initialState = {
    course: []
}

export default function (state=initialState, action){
    switch (action.type){
        case Type.COURSE_LIST:
        {
            return {
                ...state,
                course: action.payload
            }
        }
        default: return state
    }
}