import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material';

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
    return true;
  };

  const handleRegister = async () => {
    setError('');
    if (!validateForm()) return;

    // try {
    // const response = await fetch('http://localhost:8080/api/users/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email,
    //     userName: name,
    //     password,
    //     confirmPassword,
    //     role,
    //   }),
    // });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || '注册失败');
    // }

    // const data = await response.json();

    // // if (data.token) {
    // localStorage.setItem('token', data.token);
    // alert('注册成功，已自动登录');
    // // navigate(`/courses/${id}`);
    //   } else {
    alert('注册成功，请登录');
    navigate('/login');
    //   }
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="lg:w-1/2 p-10 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h1 className="text-4xl sm:text-4xl font-bold mb-4 tracking-tight">
            加入软课程管理平台
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed">
            注册成为教师、助教或学生，开启高效课程管理
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-sm text-blue-100/80">高效管理，助力教学</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 p-8 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              创建账号
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  邮箱地址
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 placeholder-gray-400 text-gray-800"
                  placeholder="请输入邮箱地址"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  姓名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 placeholder-gray-400 text-gray-800"
                  placeholder="请输入姓名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  角色
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-800"
                  required
                >
                  <option value="" disabled>
                    请选择角色
                  </option>
                  <option value="teacher">教师</option>
                  <option value="assistant">助教</option>
                  <option value="student">学生</option>
                </select>
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
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  确认密码
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 placeholder-gray-400 text-gray-800"
                  placeholder="请确认密码"
                  required
                />
              </div>
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                立即注册
              </button>
              <div className="text-center">
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  已有账号？立即登录
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

export default Register;
