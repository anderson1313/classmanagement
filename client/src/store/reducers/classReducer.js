import { ADD_CLASS, UPDATE_CLASS } from "../actions/types";


const initialState = {
    classes: [],
    deleted: false,
    updated: false,
    created: false,
    msg:{},
    id:null

}


const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CLASS:
            return {
                ...state,
                classes: [...state.classes, ...action.payload]
            };
        case UPDATE_CLASS:
            return {
                ...state,
                updated: true
            };
        case 'CLASS_CREATED':
            return {
                ...state,
                created: true
            };

        case 'CLASS_DELETED':
            return {
                ...state,
                deleted: true
            };
        case 'CLASS_SUCCESS':
            return{
                ...state,
                msg: action.payload.msg,
                id:action.payload.id
            }    
        default:
            return state
    }

}
export default classReducer;



