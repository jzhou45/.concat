import { combineReducers } from "redux";
import ui from "./ui_reducer";
import session from "./session_reducer";

const rootReducer = combineReducers({
    ui,
    session
});

export default rootReducer;