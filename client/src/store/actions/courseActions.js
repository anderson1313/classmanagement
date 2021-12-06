
import {returnErrors,clearErros} from './errorActions'

import axios from 'axios'
import {
    GET_COURSE,
    ADD_COURSE,
    DELETE_COURSE,
    UPDATE_COURSE,
    COURSE_FAIL,
    CLEAR_ERRORS,
    

} from './types.js'

// const returnSuccess=(msg,id=null)=>{
//     return{
//         type:'COURSES_SUCCESS',
//         payload:{msg,id}
//     };

// };


/* 创建课程 */
export const createCourse =
    ({ name, credit }) =>
        async (dispatch) => {
            // Headers
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            // 请求
            const body = JSON.stringify({ name, credit });
            await axios
                .post("/api/course/create", body, config)
                .then((res) => {
                    const { data } = res.data;
                  
                    dispatch({ type: ADD_COURSE, payload: [data] });
                    dispatch({ type: "COURSE_CREATED" });
                    dispatch(clearErros())
                   
                   dispatch({type:'COURSE_SUCCESS',payload:{msg:res.data.msg,id:'COURSE_SUCCESS'}})
        
                }).catch((err) => {
                    console.log(err)
                    dispatch({ type: COURSE_FAIL });
                    dispatch(
                        returnErrors(
                            err.response.data.msg,
                            err.response.status,
                            "COURSE__ERROR"
                        )
                    )

                })

        };
/*获取课程 */
export const getCourses = () => (dispatch) => {
    axios
        .get('/api/course')
        .then((res) => {
            console.log(res)
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: ADD_COURSE, payload: res.data })
        })
        .catch((err) => {
            dispatch(returnErrors(
                err.response.data.msg,
                err.response.status
            ));
        })

}

/* 删除课程 */
export const deleteCourse = (id) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    await axios
        //body方式传参数，键值要与api中接受的参数名一致，第二个参数是react界面传给action的参数
        .delete('/api/course', { data: { cno: id } }, config)
        .then(() => {
            dispatch({
                type: 'COURSE_DELETED',
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

/* 更新课程 */
export const updateCourse = ({ cno, newname, newstudents, newcredit }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // 请求
    const body = JSON.stringify({ newname, newstudents, newcredit, cno });
    await axios
        .put('/api/course', body, config)
        .then(() => dispatch({ type: UPDATE_COURSE }))
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data.msg,
                    err.response.status,
                    "UPDATE_COURSE_ERROR"
                )
            );
        });





}