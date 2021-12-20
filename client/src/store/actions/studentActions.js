import { clearErros, returnErrors } from "../actions/errorActions";
import axios from "axios";
import {
    CLEAR_ERRORS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    STUDENT_FAIL
} from "./types";

export const getStudents = () => (dispatch) => {
    axios
        .get('/api/student')
        .then((res) => {
            dispatch(clearErros());
            dispatch({ type: ADD_STUDENT, payload: res.data })
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.msg, err.response.status))
        })
}

export const createStudents =
    ({ sno, sname, ssex, sage, sclno, scno }) =>
        async (dispatch) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ sno, sname, ssex, sage, sclno, scno });
            await axios
                .post("/api/student/create", body, config)
                .then((res) => {
                    const { data } = res.data;
                    dispatch({ type: ADD_STUDENT, payload: [data] });
                    dispatch({ type: "STUDENT_CREATED" });
                    dispatch(clearErros());
                    dispatch({ type: 'STUDENT_SUCCESS', payload: { msg: res.data.msg, id: 'STUDENT_SUCCESS' } })
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({ type: STUDENT_FAIL });
                    dispatch(
                        returnErrors(
                            err.response.data.msg,
                            err.response.status,
                            "STUDENT_ERROR"
                        )
                    )

                })
        };



export const deleteStuent = (id) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    await axios
        //body方式传参数，键值要与api中接受的参数名一致，第二个参数是react界面传给action的参数
        .delete('/api/student', { data: { sno: id } }, config)
        .then(() => {
            dispatch({
                type: DELETE_STUDENT,
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

export const updateStudent = ({ sno, newname, newsex, newage, newclno, newscourse }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // 请求
    const body = JSON.stringify({ sno, newname, newsex, newage, newclno, newscourse });
    await axios
        .put('/api/student', body, config)
        .then(() => dispatch({ type: UPDATE_STUDENT }))
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data.msg,
                    err.response.status,
                    "UPDATE_STUDENT_ERROR"
                )
            );
        });

}







