import { ADD_COURSE, UPDATE_COURSE,COURSE_FAIL } from "../actions/types";


const initialState = {
    loading: true,
    
    courses: [],
    deleted: false,
    updated: false,
    created: false,
    msg:{},
    id:null

}
const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, ...action.payload]

            };
        case UPDATE_COURSE:
            return {
                ...state,
                updated: true
            };
        case 'COURSE_CREATED':
            return {
                ...state,
                created: true
            };

        case 'COURSE_DELETED':
            return {
                ...state,
                deleted: true
            };
        case COURSE_FAIL:
            return{
                ...state,
                created:false
            }
        case 'COURSE_SUCCESS':
            return{
                ...state,
                msg: action.payload.msg,
                id:action.payload.id
            
            }
        default:
            return state
    }

}
export default courseReducer;



