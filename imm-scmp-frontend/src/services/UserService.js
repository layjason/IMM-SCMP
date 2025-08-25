import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const registerUser = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData);

export const editUserProfile = (userId, profileData) => {
  return axios.put(`${API_URL}/${userId}/edit-profile`, profileData, {});
};

export const changePassword = (userId, passwordData) => {
  return axios.put(`${API_URL}/${userId}/change-password`, passwordData, {});
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/${userId}`, {});
};
