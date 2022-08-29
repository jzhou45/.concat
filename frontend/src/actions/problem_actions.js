import * as APIUtil from "../util/problem_api_util";

export const RECEIVE_ALL_PROBLEMS = "RECEIVE_ALL_PROBLEMS";

const receiveAllProblems = problems => ({
    type: RECEIVE_ALL_PROBLEMS,
    problems
});

export const fetchProblems = () => dispatch => (
    APIUtil.fetchProblems().then(problems => dispatch(receiveAllProblems(problems)))
);