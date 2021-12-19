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

export const createClass = ({clname}) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        const body = JSON.stringify({clname});
        await axios
            .post('/api/classes/create',body,config)
            .then((res) => {
                const {data} = res.data

                dispatch({type:ADD_CLASS, payload:[data]});
                dispatch({type:"CLASS_CREATED"});
                dispatch(clearErros());
                dispatch({type:'CLASS_SUCCESS',payload:{msg:res.data.msg,id:'CLASS_SUCCESS'}})

            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: CLASS_FAIL });
                dispatch(
                    returnErrors(
                        err.response.data.msg,
                        err.response.status,
                        "CLASS_ERROR"
                    )
                )
            })
        }
    
export const deleteClass = (id) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    await axios
        .delete('/api/classes', { data: { clno: id } }, config)
        .then(() => {
            dispatch({
                type:'CLASS_DELETED',
                payload: id
            })
                .catch((err) => {
                    dispatch(returnErrors(
                        err.response.data.msg,
                        err.response.status
                    ));
                })
        })

}


export const updateClass = ({clno,newclname}) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ newclname,clno });
        await axios
            .put('/api/classes', body, config)
            .then(() => dispatch({ type: UPDATE_CLASS }))
            .catch((err) => {
                dispatch(
                    returnErrors(
                        err.response.data.msg,
                        err.response.status,
                        "UPDATE_CLASS_ERROR"
                    )
                );
        });

}