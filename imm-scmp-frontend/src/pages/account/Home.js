import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const handleToggle = (mode) => {
    setIsRegister(mode === 'register');
    navigate(mode === 'register' ? '/register' : '/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl shadow-slate-200/50 max-w-2xl w-full p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Software Course Management System
        </h1>
        <p className="text-lg text-white/90 mb-6">
          Empowering Learning. Simplifying Management.
        </p>
        <div className="flex items-center justify-center mt-6">
          <div className="relative bg-white/30 rounded-full p-1 w-64 h-12 flex items-center justify-between">
            <button
              onClick={() => handleToggle('login')}
              className={`flex-1 h-full rounded-full text-lg font-medium transition-colors duration-200 ${
                !isRegister
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:bg-blue-400/50'
                  : 'text-white/80 hover:bg-blue-400/50 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleToggle('register')}
              className={`flex-1 h-full rounded-full text-lg font-medium transition-colors duration-200 ${
                isRegister
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:bg-blue-400/50'
                  : 'text-white/80 hover:bg-blue-400/50 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
