import {GET_INTAKES} from "../../Types/ProgramTypes";
import Axios from "axios";

export const GET_INTAKE = (program) => (dispatch) => {
    Axios.get(`api/intake/${program}`)
        .then(res => {
            dispatch({
                type: GET_INTAKES,
                payload: res.data
            })
        }).catch(e => console.log(e))
}
