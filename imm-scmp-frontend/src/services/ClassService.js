import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getStudents = () => axios.get(`${API_URL}/students/unassigned`);

export const addClass = (classData) =>
  axios.post(`${API_URL}/classes`, classData);

export const getClass = (userId) => axios.get(`${API_URL}/${userId}`);
