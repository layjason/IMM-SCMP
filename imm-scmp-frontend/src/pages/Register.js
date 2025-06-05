import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { register } from '../services/auth';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (formData.name.length < 2)
      errors.name = 'Name must be at least 2 characters';
    if (!formData.email.includes('@')) errors.email = 'Invalid email';
    if (formData.password.length < 8 || formData.password.length > 20)
      errors.password = 'Password must be 8–20 characters';
    if (!['TEACHER', 'ASSISTANT', 'STUDENT'].includes(formData.role))
      errors.role = 'Select a valid role';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      // await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={!!fieldErrors.name}
          helperText={fieldErrors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          name="role"
          label="Role"
          value={formData.role}
          onChange={handleChange}
          error={!!fieldErrors.role}
          helperText={fieldErrors.role}
          fullWidth
          margin="normal"
        >
          <MenuItem value="TEACHER">Teacher</MenuItem>
          <MenuItem value="ASSISTANT">Assistant</MenuItem>
          <MenuItem value="STUDENT">Student</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
      <Snackbar
        open={!!error}
        message={error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      />
    </Box>
  );
}

export default Register;
