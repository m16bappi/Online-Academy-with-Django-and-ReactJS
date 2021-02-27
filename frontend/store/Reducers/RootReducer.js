import { combineReducers } from 'redux';
import Blogs from './Blogs/Blogs';
import Auth from './Auth/Auth';
import Program from "./Program/Program";
import Classroom from "./Classroom/Classroom";
import Course from "../Reducers/Course/Course"

export default combineReducers({
    Blogs,
    Auth,
    Program,
    Classroom,
    Course
});