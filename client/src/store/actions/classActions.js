import {returnErrors,clearErros} from './errorActions'

import axios from 'axios'
import {
    GET_CLASS,
    ADD_CLASS,
    DELETE_CLASS,
    UPDATE_CLASS,
    CLASS_FAIL,
    CLEAR_ERRORS
    
    
    

} from './types.js'



  export const getClasses = () => (dispatch) => {
    axios
        .get('/api/classes')
        .then((res) => {
            console.log(res)
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: ADD_CLASS, payload: res.data })
        })
        .catch((err) => {
            dispatch(returnErrors(
                err.response.data.msg,
                err.response.status
            ));
        })

}