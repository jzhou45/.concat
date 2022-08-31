import { RECEIVE_DOCUMENT_ERRORS } from "../actions/document_actions";

const _nullErrors = {};

const DocumentErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_DOCUMENT_ERRORS:
            return Object.assign({} , action.errors);
        default:
            return state;
    };
};

export default DocumentErrorsReducer;