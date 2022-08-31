import axios from "axios";

export const createDocument = (roomId, problemId, documentData) => (
    axios.post(`/api/documents/${roomId}/${problemId}`, documentData)
);

export const updateDocument = (roomId, problemId, documentData) => (
    axios.patch(`/api/documents/${roomId}/${problemId}`, documentData)
);