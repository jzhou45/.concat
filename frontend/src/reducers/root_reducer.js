import { combineReducers } from "redux";
import ui from "./ui_reducer";
import session from "./session_reducer";
import errors from './errors_reducer'
import rooms from "./rooms_reducer";
import problems from "./problems_reducer";

const rootReducer = combineReducers({
    ui,
    session,
    errors, 
    rooms,
    problems
});

export default rootReducer;