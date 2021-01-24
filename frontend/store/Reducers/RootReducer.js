import { combineReducers } from 'redux';
import Blogs from './Blogs/Blogs';
import Login from './Auth/Auth';
import Program from "./Program/Program";

export default combineReducers({
    Blogs,
    Login,
    Program
});