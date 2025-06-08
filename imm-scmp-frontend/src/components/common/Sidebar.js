// src/Sidebar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('/courses');
  const role = 'TEACHER';
  const navigate = useNavigate();

  const teacherMenu = [
    { text: 'Create Course', path: '/courses/create', icon: '🎓' },
    { text: 'Manage Classes', path: '/classes', icon: '📋' },
    { text: 'Upload Resources', path: '/resources/upload', icon: '📁' },
    { text: 'Analytics', path: '/analytics', icon: '📊' },
  ];

  const studentMenu = [
    { text: 'My Courses', path: '/courses', icon: '📚' },
    { text: 'My Progress', path: '/progress', icon: '📈' },
    { text: 'My History', path: '/history', icon: '📜' },
  ];

  const menuItems =
    role === 'TEACHER' || role === 'ASSISTANT' ? teacherMenu : studentMenu;

  return (
    <div className="fixed left-0 top-[80px] h-[calc(100vh-80px)] w-[300px] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-xl z-40">
      <div className="p-8">
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {role === 'TEACHER' || role === 'ASSISTANT'
              ? 'Teacher Dashboard'
              : 'Student Dashboard'}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
        </div>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.text}
              onClick={() => {
                setActiveItem(item.path);
                navigate(item.path);
              }}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl text-left transition-all duration-200 group ${
                activeItem === item.path
                  ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-base font-medium">{item.text}</span>
              {activeItem === item.path && (
                <div className="ml-auto">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </nav>
        <div className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-blue-100">
          <h4 className="text-base font-semibold text-gray-700 mb-4">
            Quick Stats
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Courses</span>
              <span className="text-base font-bold text-blue-600">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Students</span>
              <span className="text-base font-bold text-blue-600">124</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="text-base font-bold text-blue-600">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
