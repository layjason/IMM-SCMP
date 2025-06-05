import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
} from '@mui/material';

function Home() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const handleToggle = () => {
    setIsRegister((prev) => !prev);
  };

  const handleNavigate = () => {
    navigate(isRegister ? '/register' : '/login');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 6,
          width: '100%',
          maxWidth: 700,
          textAlign: 'center',
          borderRadius: 6,
          backdropFilter: 'blur(15px)',
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
          Software Course Management System
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          Empowering Learning. Simplifying Management.
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isRegister}
              onChange={handleToggle}
              color="default"
            />
          }
          label={isRegister ? 'Register Mode' : 'Login Mode'}
          sx={{ mt: 4, color: 'white' }}
        />
        <Button
          variant="outlined"
          size="large"
          onClick={handleNavigate}
          sx={{
            mt: 4,
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: '2rem',
            color: 'white',
            borderColor: 'white',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'white',
            },
          }}
        >
          {isRegister ? 'Register' : 'Login'}
        </Button>
      </Paper>
    </Box>
  );
}

export default Home;
