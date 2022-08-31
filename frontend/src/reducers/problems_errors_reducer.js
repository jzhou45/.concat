import { RECEIVE_PROBLEM_ERRORS, CLEAR_PROBLEM_ERRORS } from "../actions/problem_actions";

const _nullErrors = [];

const ProblemErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PROBLEM_ERRORS:
            return Object.assign({} , action.errors);
        case CLEAR_PROBLEM_ERRORS:
            return _nullErrors;
        default:
            return state;
    };
};

export default ProblemErrorsReducer