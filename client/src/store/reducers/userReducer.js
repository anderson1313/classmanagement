const initialState = {
    user: [],
    login: false,
    created: false,
    msg: {},
    id: null

}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                user: [...state.user, ...action.payload]
            };

        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                login: true
            };
        case 'USER_LOGIN_FAIL':
            return {
                ...state,
                login: false,
            };

        case 'USER_CREATED':
            return {
                ...state,
                created: true
            };

        case 'USER_CREATE_FAIL':
            return {
                ...state,
                created: false,
            };


        case 'USER_CREATE_SUCCESS':
            return {
                ...state,
                msg: action.payload.msg,
                id: action.payload.id
            }
        default:
            return state
    }

}
export default userReducer;



