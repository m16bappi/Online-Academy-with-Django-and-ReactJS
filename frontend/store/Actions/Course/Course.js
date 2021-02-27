import Axios from "axios";
import * as Type from "../../Types/CourseTypes";

export const get_course_list = () => dispatch => {
    Axios.get('api/course/list/')
        .then(res => {
            dispatch({
                type: Type.COURSE_LIST,
                payload: res.data
            })
        }).catch(error => console.log(error))
}
