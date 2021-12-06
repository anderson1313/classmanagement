import { combineReducers } from "redux";
import classReducer from './classReducer';
import courseReducer from './courseReducer';
import studentReducer from './studentReducer';
import errorReducer from './errorReducer';

const rootReducers = combineReducers({
    cla: classReducer,
    cou: courseReducer,
    stu: studentReducer,
    error: errorReducer
})
export default rootReducers