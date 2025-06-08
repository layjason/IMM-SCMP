import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import getId from '../../utils/getId';
import getRole from '../../utils/getRole';
import { SidebarContext } from '../../utils/SidebarContext';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [user, setUser] = useState({ role: '', studentId: '' });
  const [stats, setStats] = useState({
    activeCourses: 0,
    totalStudents: 0,
    completionRate: 0,
  });
  const [error, setError] = useState('');
  const { isExpanded, setIsExpanded } = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const mockUser = { role: `${getRole(getId())}`, studentId: `${getId()}` };
      // console.log('Mock user from sidebar:', getId(), getRole()); // Debug
      setUser(mockUser);
      const mockStats = {
        activeCourses: 4,
        totalStudents: 8,
        completionRate: 7,
      };
      setStats(mockStats);
    } catch (err) {
      console.error('Error setting mock data:', err);
      setError('Failed to load mock data');
    }
  }, [navigate]);

  // Define menu items with useMemo to depend on user.studentId
  const teacherMenu = useMemo(
    () => [
      { text: 'My Courses', path: `/courses/${user.studentId}`, icon: '📚' },
      {
        text: 'My Classes',
        path: `/classes/${user.studentId}`,
        icon: '👩🏻‍🏫',
      },
      {
        text: 'Resources',
        path: `/resources/upload/${user.studentId}`,
        icon: '📁',
      },
      // { text: 'Analytics', path: `/analytics/${user.studentId}`, icon: '📊' },
    ],
    [user.studentId]
  );

  const studentMenu = useMemo(
    () => [
      { text: 'My Courses', path: `/courses/${user.studentId}`, icon: '📚' },
      {
        text: 'My Assignment',
        path: `/assignment/${user.studentId}`,
        icon: '📈',
      },
      { text: 'My History', path: `/history/${user.studentId}`, icon: '📜' },
    ],
    [user.studentId]
  );

  // Ensure menuItems is always an array
  const menuItems = useMemo(() => {
    if (!user.role) return [];
    return user.role === 'TEACHER' || user.role === 'ASSISTANT'
      ? teacherMenu
      : studentMenu;
  }, [user.role, teacherMenu, studentMenu]);

  // Set activeMenu based on current route or first item
  useEffect(() => {
    if (menuItems.length > 0) {
      const currentPath = location.pathname;
      const matchingItem = menuItems.find((item) => item.path === currentPath);
      setActiveMenu(matchingItem ? matchingItem.path : menuItems[0].path);
    }
  }, [menuItems, location.pathname]);

  // Conditional render until user is loaded
  if (!user.studentId) {
    return null; // Or a loading spinner
  }

  return (
    <div
      className={`fixed left-0 top-[80px] h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-xl z-40 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-[300px]' : 'w-[80px]'
      }`}
    >
      <IconButton
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          position: 'absolute',
          top: '2rem',
          right: '1.5rem',
          width: '2rem',
          height: '2rem',
          backgroundColor: '#1976d2',
          color: '#fff',
          borderRadius: '50%',
          boxShadow: 3,
          zIndex: 50,
        }}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <div
        className={`p-${isExpanded ? '8' : '4'} transition-all duration-300`}
      >
        {isExpanded && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {user.role === 'TEACHER' || user.role === 'ASSISTANT'
                ? 'Teacher Dashboard'
                : 'Student Dashboard'}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
          </div>
        )}

        <nav className={`space-y-3 ${!isExpanded ? 'mt-16' : ''}`}>
          {menuItems.map((item) => (
            <button
              key={item.text}
              onClick={() => {
                setActiveMenu(item.path);
                navigate(item.path);
              }}
              className={`w-full flex items-center transition-all duration-200 group ${
                isExpanded ? 'space-x-4 px-5 py-4' : 'justify-center px-3 py-3'
              } rounded-xl text-left ${
                activeMenu === item.path
                  ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
              }`}
              title={!isExpanded ? item.text : ''}
            >
              <span className={`${isExpanded ? 'text-2xl' : 'text-xl'}`}>
                {item.icon}
              </span>
              {isExpanded && (
                <>
                  <span className="text-base font-medium">{item.text}</span>
                  {activeMenu === item.path && (
                    <div className="ml-auto">
                      <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {isExpanded && (
          <div className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-blue-100">
            <h4 className="text-base font-semibold text-gray-700 mb-4">
              Quick Stats
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Courses</span>
                <span className="text-base font-bold text-blue-600">
                  {stats.activeCourses}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Students</span>
                <span className="text-base font-bold text-blue-600">
                  {stats.totalStudents}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="text-base font-bold text-blue-600">
                  {stats.completionRate}%
                </span>
              </div>
            </div>
          </div>
        )}

        {error && isExpanded && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
