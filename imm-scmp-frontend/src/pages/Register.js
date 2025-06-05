import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import '../styles/Register.css'; // 使用独立样式文件

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !name || !role) {
      setError('请填写所有必填字段');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('请输入有效的邮箱地址');
      return false;
    }
    if (password !== confirmPassword) {
      setError('密码和确认密码不匹配');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setError('');
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '注册失败');
      }

      alert('注册成功');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="register-root">
      <Box className="register-left">
        <Typography variant="h4" className="register-title">
          加入软课程管理平台
        </Typography>
        <Typography className="register-subtitle">
          注册成为教师、助教或学生，管理你的课程资源。
        </Typography>
      </Box>

      <Box className="register-right">
        <Box className="register-box">
          <Typography variant="h5" component="h5">
            注册
          </Typography>

          <TextField
            label="邮箱地址"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            label="姓名"
            fullWidth
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>角色</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="teacher">教师</MenuItem>
              <MenuItem value="assistant">助教</MenuItem>
              <MenuItem value="student">学生</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="密码"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            label="确认密码"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />

          {error && (
            <Alert severity="error" className="register-alert">
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            className="register-button"
            onClick={handleRegister}
          >
            注册
          </Button>

          <Button
            fullWidth
            variant="text"
            color="primary"
            className="register-link"
            onClick={() => navigate('/login')}
          >
            已有账号？去登录
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
