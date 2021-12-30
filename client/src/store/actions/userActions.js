import { returnErrors, clearErros } from './errorActions'
import axios from 'axios'

/* 创建用户 */
export const createUser =
    ({ name, passwd, type }) =>
        async (dispatch) => {
            // Headers
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            // 请求
            const body = JSON.stringify({ name, passwd,type });
            await axios
                .post("/api/user/create", body, config)
                .then((res) => {
                    const { data } = res.data;
                    
                    dispatch({ type: "USER_CREATED" });
                    dispatch(clearErros())

                }).catch((err) => {
                    console.log(err)
                    dispatch({ type: "USER_CREATE_FAIL" });
                    dispatch(
                        returnErrors(
                            err.response.data.msg,
                            err.response.status,
                            "USER_CREATE_ERROR"
                        )
                    )

                })

        };


/*登陆 */
export const userLogin =
    ({ name, passwd }) => async (dispatch) => {
        
        // Headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        // 请求
        const body = JSON.stringify({ name, passwd });
        console.log(body)
        
        axios
            .post("/api/user/login", body, config)
            .then((res) => {
                console.log(res)
                const { user } = res.data;
                
                dispatch({ type: "ADD_USER", payload: [user] });
                dispatch({ type: "USER_LOGIN_SUCCESS" });
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: "USER_CREATE_FAIL" });
                dispatch(
                    returnErrors(
                        err.response.data.msg,
                        err.response.status,
                        "USER_LOGIN_FAIL"
                    )
                )

            })


    }




// 获取用户
// export const getUsers = () => (dispatch) => {
//     axios
//         .get('/api/user')
//         .then((res) => {
//             console.log(res)
//             dispatch({ type: "CLEAR_ERRORS" });
//             dispatch({ type: "ADD_USER", payload: res.data })
//         })
//         .catch((err) => {
//             dispatch(returnErrors(
//                 err.response.data.msg,
//                 err.response.status
//             ));
//         })

// }

