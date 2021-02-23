import * as Type from "../../Types/ProgramTypes";
import Axios from "axios";

export const get_intakes = () => (dispatch) => {
    Axios.get(`api/intake/`)
        .then(res => {
            dispatch({
                type: Type.GET_INTAKES,
                payload: res.data
            })
        }).catch(e => console.log(e))
}

export const get_programs = () => (dispatch) => {
    Axios.get(`api/program/`)
        .then(res => {
            dispatch({
                type: Type.GET_PROGRAMS,
                payload: res.data
            })
        }).catch(error => console.log(error))
}
