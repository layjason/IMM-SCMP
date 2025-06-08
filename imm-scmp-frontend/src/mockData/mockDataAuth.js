// src/mockData/mockDataAuth.js

// Simulated user database
const users = [
  {
    id: 'T73066209',
    email: 'student1@example.com',
    userName: 'Student One',
    password: 'password123',
    role: 'student',
    token: 'mock-jwt-token-student1-1234567890',
  },
  {
    id: 'T73066210',
    email: 'teacher1@example.com',
    userName: 'Teacher One',
    password: 'password123',
    role: 'teacher',
    token: 'mock-jwt-token-teacher1-0987654321',
  },
];

// Simulated delay to mimic API response time
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock login function
export const loginUser = async (email, password) => {
  await delay(500); // Simulate network delay
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  return {
    token: user.token,
    user: { id: user.id, userName: user.userName, role: user.role },
  };
};

// Mock register function
export const registerUser = async ({
  email,
  userName,
  password,
  confirmPassword,
  role,
}) => {
  await delay(500); // Simulate network delay
  if (users.some((u) => u.email === email)) {
    throw new Error('Email already exists');
  }
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }
  const newUser = {
    id: `T${Date.now()}`, // Generate a unique ID
    email,
    userName,
    password,
    role,
    token: `mock-jwt-token-${userName}-${Date.now()}`,
  };
  users.push(newUser);
  return { token: newUser.token, user: { id: newUser.id, userName, role } };
};

//Mock logout function
export const logoutUser = async () => {
  await delay(500); // Simulate network delay
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return { message: 'Logged out successfully' };
};
