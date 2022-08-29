import axios from 'axios';

export const fetchRooms = () => {
  return axios.get('/api/rooms');
};

export const fetchRoom = (userId) => {
  return axios.get(`/api/users/${userId}`)
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



