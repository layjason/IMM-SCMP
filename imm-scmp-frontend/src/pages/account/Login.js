// add jwt token
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material';
import getId from '../../utils/getId';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // const response = await fetch('http://localhost:8080/api/users/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || '登录失败');
      // }

      // const data = await response.json();

      // const { token, user } = data;

      // localStorage.setItem('token', token);
      // need to be replaced later
      const userid = 'T73066209';
      // localStorage.setItem('userId', user.id); // Optional: store userId if you need it globally
      localStorage.setItem('token', '12345');
      localStorage.setItem('userId', userid);
      alert('登录成功');
      // navigate(`/courses/${user.id}`);
      navigate(`/courses/${getId()}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="lg:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h1 className="text-3xl font-bold mb-4">欢迎使用软课程管理平台</h1>
        <p className="text-lg text-blue-100">
          教师、助教和学生都可以在这里高效管理教学资源。
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-700 mb-6">登录</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                学工号 / 邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                placeholder="请输入学工号 / 邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                placeholder="请输入密码"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              登录
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors duration-200"
            >
              没有账号？去注册
            </button>
          </div>
          {error && (
            <div className="fixed bottom-6 right-6 z-50">
              <div className="px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm bg-red-500/90 text-white flex items-center gap-3">
                <ErrorOutline className="w-5 h-5" />
                <span className="font-medium">{error}</span>
                <button
                  onClick={() => setError('')}
                  className="ml-2 text-white/80 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
