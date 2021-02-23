import * as Types from '../../Types/AuthTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loginStart: false,
    user: [],
    profile: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_START:
            {
                return {
                    ...state,
                    loginStart: true
                }
            }

        case Types.USER_LOADED:
            {
                return {
                    ...state,
                    loginStart: false,
                    isAuthenticated: true,
                    user: action.payload.user,
                    profile: action.payload.profile
                }
            }

        case Types.LOGIN_SUCCESS:
        case Types.REGISTER_SUCCESS:
            {
                localStorage.setItem('token', action.payload.token);
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    loginStart: false
                }
            }
            
        case Types.USER_LOGOUT:
        case Types.LOGIN_FAILD:
            {
                return {
                    ...state,
                    token: localStorage.removeItem('token'),
                    isAuthenticated: false,
                    loginStart: false,
                    user: [],
                    profile: []
                }
            }

        default:
            return state
    }
}