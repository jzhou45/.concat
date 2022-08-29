import axios from 'axios';

export const signup = (userData) => {
  return axios.post('/api/users/signup', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};