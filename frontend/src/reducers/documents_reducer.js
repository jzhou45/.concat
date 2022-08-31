import { RECEIVE_DOCUMENT } from "../actions/document_actions";
import { RECEIVE_PROBLEM } from "../actions/problem_actions";

const documentReducer = (state=null, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_DOCUMENT:
            return action.document.data;
        default:
            return nextState;
    };
};

export default documentReducer;