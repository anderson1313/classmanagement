import { returnErrors } from "../actions/errorActions";
import axios from "axios";
import {
  CLEAR_ERRORS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  STUDENT_FAIL
} from "./types";

export const getStudents = () => (dispatch) =>{
    axios
    .get('/api/student')
    .then((res)=>{
        dispatch({type:CLEAR_ERRORS})
        dispatch({type:ADD_STUDENT,payload:res.data})
    })
    .catch((err)=>{
        dispatch(returnErrors(err.response.data.msg, err.response.status))
    })

}


