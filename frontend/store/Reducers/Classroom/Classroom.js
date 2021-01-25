import {GET_CLASSROOM} from "../../Types/ClassroomTypes";

const initialState = {
    classroom: []
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
        default:
            return state
    }
}