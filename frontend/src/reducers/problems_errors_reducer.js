import { RECEIVE_PROBLEM_ERRORS } from "../actions/problem_actions";

const _nullErrors = [];

const ProblemErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PROBLEM_ERRORS:
            return Object.assign({} , action.errors);
        default:
            return state;
    };
};

export default ProblemErrorsReducer