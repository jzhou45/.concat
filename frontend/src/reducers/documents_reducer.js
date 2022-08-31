import { RECEIVE_DOCUMENT } from "../actions/document_actions";

const documentReducer = (state={}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_DOCUMENT:
            return nextState.document = action.document
        default:
            return nextState;
    };
};

export default documentReducer;