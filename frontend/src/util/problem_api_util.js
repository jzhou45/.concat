import axios from "axios"

export const fetchProblems = () => (
    axios.get("/api/problems/set")
);

export const createProblem = (roomId, problem) => (
    axios.post(`/api/problems/${roomId}`, problem)
);