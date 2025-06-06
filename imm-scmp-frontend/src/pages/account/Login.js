import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import '../../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '登录失败');
      }

      const data = await response.json();
      localStorage.setItem('userId', data.userId);
      alert('登录成功');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="login-root">
      <Box className="login-left">
        <Typography variant="h4" className="login-title">
          欢迎使用 <br></br>软课程管理平台
        </Typography>
        <Typography className="login-subtitle">
          教师、助教和学生都可以在这里高效管理教学资源。
        </Typography>
      </Box>

      <Box className="login-right">
        <Box className="login-box">
          <Typography variant="h5" component="h5">
            登录
          </Typography>

          <TextField
            label="邮箱"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            label="密码"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            style={{ marginTop: 24 }}
            onClick={handleLogin}
          >
            登录
          </Button>
          <Button
            fullWidth
            variant="text"
            color="primary"
            style={{ marginTop: 8 }}
            onClick={() => navigate('/register')}
          >
            没有账号？去注册
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
