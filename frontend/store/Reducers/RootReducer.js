import { combineReducers } from 'redux';
import Blogs from './Blogs/Blogs';
import Auth from './Auth/Auth';
import Program from "./Program/Program";
import Classroom from "./Classroom/Classroom";

export default combineReducers({
    Blogs,
    Auth,
    Program,
    Classroom
});