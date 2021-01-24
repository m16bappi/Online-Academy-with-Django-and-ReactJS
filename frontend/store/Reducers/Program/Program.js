import {GET_INTAKES} from "../../Types/ProgramTypes";

const initialStates = {
    intake: []
}

export default function (state = initialStates, action){
    switch (action.type){
        case GET_INTAKES:
        {
            return {
                ...state,
                intake: action.payload
            }
        }
        default:
            return state
    }
}