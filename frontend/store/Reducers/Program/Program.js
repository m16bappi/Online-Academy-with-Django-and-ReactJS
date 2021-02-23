import * as Type from "../../Types/ProgramTypes";

const initialStates = {
    program: [],
    intake: []
}

export default function (state = initialStates, action){
    switch (action.type){
        case Type.GET_INTAKES:
        {
            return {
                ...state,
                intake: action.payload
            }
        }
        case Type.GET_PROGRAMS:
        {
            return {
                ...state,
                program: action.payload
            }
        }
        default:
            return state
    }
}
