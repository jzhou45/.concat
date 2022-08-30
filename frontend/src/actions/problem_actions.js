import * as APIUtil from "../util/problem_api_util";

export const RECEIVE_ALL_PROBLEMS = "RECEIVE_ALL_PROBLEMS";
export const RECEIVE_PROBLEM = "RECEIVE_PROBLEM";
export const RECEIVE_PROBLEM_ERRORS = "RECEIVE_PROBLEM_ERRORS";

const receiveAllProblems = problems => ({
    type: RECEIVE_ALL_PROBLEMS,
    problems
});

const receiveProblem = problem => ({
    type: RECEIVE_PROBLEM,
    problem
});

const recieveProblemErrors = errors => ({
    type: RECEIVE_PROBLEM_ERRORS,
    errors
});

export const fetchProblems = () => dispatch => (
    APIUtil.fetchProblems().then(problems => dispatch(receiveAllProblems(problems)))
);

export const createProblem = (roomId, problem) => dispatch => (
    APIUtil.createProblem(roomId, problem).then(problem => dispatch(receiveProblem(problem))).catch(errors => dispatch(recieveProblemErrors(errors.response.data)))
);