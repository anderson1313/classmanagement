import {GET_ERRORS,LOADING,CLEAR_ERRORS} from './types'


export const returnErrors=(msg,status,id=null)=>{
    return{
        type:GET_ERRORS,
        payload:{msg,status,id}
    };

};
export const clearErros=()=>{
    return{
        type:CLEAR_ERRORS
    }
}