import { GET_BLOG, ADD_BLOG, DELETE_BLOG, FILTER } from '../../Types/BlogTypes';

const initialStates = {
    Blogs: []
}

export default function (state = initialStates, action) {
    switch (action.type) {
        case GET_BLOG:
            return {
                ...state,
                Blogs: action.payload
            }
        case DELETE_BLOG:
            return {
                ...state,
                Blogs: state.Blogs.filter(item => {
                    return item.id !== action.payload
                })
            }
        case ADD_BLOG:
            return {
                ...state,
                Blogs: [action.payload, ...state.Blogs] 
            }
        case FILTER: {
            return {
                ...state,
                Blogs: state.Blogs.filter(item=> {
                    return item.category === action.payload
                })
            }
        }
        default:
            return state
    }
}
