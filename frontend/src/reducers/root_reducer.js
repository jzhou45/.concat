import { combineReducers } from "redux";
import ui from "./ui_reducer";
import session from "./session_reducer";
import errors from './errors_reducer'

const rootReducer = combineReducers({
    ui,
    session,
    errors
});

export default rootReducer;