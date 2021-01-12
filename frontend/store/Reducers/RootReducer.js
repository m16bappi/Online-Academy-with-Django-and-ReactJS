import { combineReducers } from 'redux';
import Blogs from './Blogs/Blogs';
import Login from './Auth/Login'

export default combineReducers({
    Blogs,
    Login,
});