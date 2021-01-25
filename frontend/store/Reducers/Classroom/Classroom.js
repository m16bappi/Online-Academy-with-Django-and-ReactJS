import {GET_CLASSROOM, GET_MY_CLASSROOM} from "../../Types/ClassroomTypes";

const initialState = {
    classroom: [],
    myclassroom: []
}

export default function (state=initialState, action) {
    switch (action.type){
        case GET_CLASSROOM:
        {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_MY_CLASSROOM:
        {
            return {
                ...state,
                myclassroom: action.payload
            }
        }
        default:
            return state
    }
}