import * as APIUtil from "../util/problem_api_util";

export const RECEIVE_ALL_PROBLEMS = "RECEIVE_ALL_PROBLEMS";
export const RECEIVE_PROBLEM = "RECEIVE_PROBLEM";
export const RECEIVE_PROBLEM_ERRORS = "RECEIVE_PROBLEM_ERRORS";
export const REMOVE_PROBLEM = "REMOVE_PROBLEM"
export const CLEAR_PROBLEM_ERRORS = "CLEAR_PROBLEM_ERRORS"

export const clearProblemErrors = () => ({
    type: CLEAR_PROBLEM_ERRORS
})

export const receiveAllProblems = problems => ({
    type: RECEIVE_ALL_PROBLEMS,
    problems
});

export const receiveProblem = problem => ({
    type: RECEIVE_PROBLEM,
    problem
});

export const removeProblem = problemId => {
    return {
    type: REMOVE_PROBLEM,
    problemId
}};

export const recieveProblemErrors = errors => ({
    type: RECEIVE_PROBLEM_ERRORS,
    errors
});

export const fetchProblems = () => dispatch => (
    APIUtil.fetchProblems().then(problems => dispatch(receiveAllProblems(problems)))
);

export const createProblem = (roomId, problem) => dispatch => (
    APIUtil.createProblem(roomId, problem)
        .then(problem => dispatch(receiveProblem(problem)))
        .catch(errors => dispatch(recieveProblemErrors(errors.response.data)))
);

export const editProblem = (roomId, problemId, problemData) => dispatch => {
    return APIUtil.editProblem(roomId, problemId, problemData)
        .then(problem => dispatch(receiveProblem(problem)))
        .catch(errors => dispatch(recieveProblemErrors(errors.response.data)))
};

export const deleteProblem = (roomId, problemId) => dispatch => {
    return APIUtil.deleteProblem(roomId, problemId)
        .then(() => dispatch(removeProblem(problemId)))
        // this is not hitting the .then
};

export const fetchCreatedProblems = roomId => dispatch => (
    APIUtil.fetchCreatedProblems(roomId)
        .then(problems => dispatch(receiveAllProblems(problems)))
);

export const fetchProblem = (roomId, problemId) => dispatch => (
    APIUtil.fetchProblem(roomId, problemId).then(problem => dispatch(receiveProblem(problem)))
);