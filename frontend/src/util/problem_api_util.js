import axios from "axios"

export const fetchProblems = () => (
    axios.get("/api/problems/set")
);