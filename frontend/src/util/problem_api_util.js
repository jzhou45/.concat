import axios from "axios"

export const fetchProblems = () => (
    axios.get("/api/problems/set")
);

export const createProblem = (roomId, problem) => (
    axios.post(`/api/problems/${roomId}`, problem)
);

export const fetchCreatedProblems = (roomId) => (
    axios.get(`/api/problems/${roomId}/createdproblems`)
);

export const fetchProblem = (roomId, problemId) => {
    return axios.get(`/api/problems/${roomId}/${problemId}`)
}