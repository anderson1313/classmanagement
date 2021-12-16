import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from '../actions/types'
const initialState = {
    students: [],
    deleted: false,
    updated: false,
    created: false,
    msg:{},
    id:null
}
const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, ...action.payload]
            };

        case 'STUDENT_CREATED':
            return {
                ...state,
                created: true
            };
        case UPDATE_STUDENT:
            return {
                ...state,
                updated: true
            };
        case DELETE_STUDENT:
            return {
                ...state,
                deleted: true
            };
            case 'STUDENT_SUCCESS':
            return{
                ...state,
                msg: action.payload.msg,
                id:action.payload.id
            
            }
        default:
            return state;
    }

}
export default studentReducer;