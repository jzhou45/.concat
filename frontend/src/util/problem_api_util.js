import axios from "axios"

export const fetchProblems = () => (
    axios.get("/api/problems/set")
);

export const createProblem = (roomId, problem) => {
    console.log(roomId, problem)
    return axios.post(`/api/problems/${roomId}`, problem)
};

export const fetchCreatedProblems = (roomId) => (
    axios.get(`/api/problems/${roomId}/createdproblems`)
);

export const fetchProblem = (roomId, problemId) => {
    return axios.get(`/api/problems/${roomId}/${problemId}`)
}

export const deleteProblem = (roomId, problemId) => {
    return axios.delete(`/api/problems/${roomId}/${problemId}`)
}

export const editProblem = (roomId, problemId, problemData) => {
    return axios.patch(`/api/problems/${roomId}/${problemId}`, problemData)
}