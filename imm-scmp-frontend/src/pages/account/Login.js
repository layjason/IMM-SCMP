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
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '登录失败');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('Role', data.Role);
      alert('登录成功');
      navigate(`/courses/${getId()}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="lg:w-1/2 p-10 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 tracking-tight">
            软课程管理平台
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed">
            为教师、助教和学生提供高效的教学资源管理体验
          </p>
          <div className="mt-8 hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-400/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-blue-100/80">无缝协作，助力学习</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 p-8 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              欢迎登录
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  学工号 / 邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 placeholder-gray-400 text-gray-800"
                  placeholder="请输入学工号或邮箱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 placeholder-gray-400 text-gray-800"
                  placeholder="请输入密码"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                立即登录
              </button>
              <div className="text-center">
                <button
                  onClick={() => navigate('/register')}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  没有账号？立即注册
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
          <div className="px-6 py-4 rounded-xl shadow-lg bg-red-500 text-white flex items-center gap-3">
            <ErrorOutline className="w-5 h-5" />
            <span className="font-medium">{error}</span>
            <button
              onClick={() => setError('')}
              className="ml-2 text-white/80 hover:text-white font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
