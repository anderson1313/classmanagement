import { combineReducers } from "redux";
import classReducer from './classReducer';
import courseReducer from './courseReducer';
import studentReducer from './studentReducer';
import errorReducer from './errorReducer';
import userReducer from "./userReducer";

const rootReducers = combineReducers({
    cla: classReducer,
    cou: courseReducer,
    stu: studentReducer,
    error: errorReducer,
    user:userReducer
})
export default rootReducers