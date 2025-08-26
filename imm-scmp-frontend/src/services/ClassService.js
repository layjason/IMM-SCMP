import axios from 'axios';

export const getStudents = () => axios.get(`/api/classes`);

// className and teacherId
export const addClass = (classData) => axios.post('/api/classes', classData);
