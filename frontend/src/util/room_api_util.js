import axios from 'axios';

export const fetchRooms = () => {
  return axios.get('/api/rooms');
};

export const fetchRoom = (roomId) => {
  return axios.get(`/api/rooms/${roomId}`)
}

export const createRoom = (roomData) => {
  return axios.post(`/api/rooms`, roomData)
}

export const renameRoom = (roomData) => {
  return axios.patch(`/api/rooms/${roomData.id}/rename`, roomData)
}

export const joinRoom = (roomId) => {
  return axios.patch(`/api/rooms/${roomId}/join`)
}

export const deleteRoom = (roomId) => {
  return axios.delete(`/api/rooms/${roomId}`)
}

export const leaveRoom = (roomId) => {
  return axios.patch(`/api/rooms/${roomId}/leave`)
}

export const patchComplete = (roomId, problemId) => (
  axios.patch(`/api/rooms/${roomId}/${problemId}/complete`)
);

export const patchIncomplete = (roomId, problemId) => (
  axios.patch(`/api/rooms/${roomId}/${problemId}/incomplete`)
);