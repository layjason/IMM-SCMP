import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/common/Search';
import ClassCard from '../../components/ClassCard';
import { SidebarContext } from '../../utils/SidebarContext';
import getClasses from '../../utils/getClasses';
import { AddCircle } from '@mui/icons-material';
import { decodeJwtToken } from '../../services/JwtService';

const ClassList = () => {
  const { isExpanded } = useContext(SidebarContext);
  const [teacherId, setTeacherId] = useState('');
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const drawerWidth = isExpanded ? 300 : 80;

  // Load classes for the teacher
  const loadClasses = async () => {
    try {
      const data = await getClasses();
      const teacherClasses = data.filter(
        (classItem) => classItem.teacherId === teacherId
      );
      setClasses(teacherClasses);
      setFilteredClasses(teacherClasses);
    } catch (err) {
      setError('无法获取班级信息');
    }
  };

  // Fetch teacher ID from token
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('未找到登录令牌');
          navigate('/login');
          return;
        }
        const decodedToken = decodeJwtToken(token);
        setTeacherId(decodedToken.userId);
      } catch (err) {
        setError('无法获取用户信息');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  // Load classes when teacherId is available
  useEffect(() => {
    if (teacherId) {
      loadClasses();
    }
  }, [teacherId]);

  // Filter classes based on search term
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = classes.filter(
      (classItem) =>
        classItem.className.toLowerCase().includes(term) ||
        classItem.teacherId.toLowerCase().includes(term) ||
        classItem.classCode.toLowerCase().includes(term)
    );
    setFilteredClasses(filtered);
  }, [searchTerm, classes]);

  // Handle class update
  const handleClassUpdate = (updatedClass) => {
    if (updatedClass.teacherId !== teacherId) {
      alert('您只能更新自己的班级。');
      return;
    }
    const updatedClasses = classes.map((c) =>
      c.classId === updatedClass.classId ? updatedClass : c
    );
    setClasses(updatedClasses);
    setFilteredClasses(updatedClasses);
  };

  // Navigate to class form
  const handleAddNewClass = () => {
    navigate('/ClassForm');
  };

  // Render error or login prompt
  if (error || !teacherId) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            mt: '60px',
            flexGrow: 1,
            p: 3,
            marginLeft: `${drawerWidth}px`,
            transition: 'margin 0.3s ease',
            bgcolor: 'background.default',
            minHeight: '100vh',
          }}
        >
          <Typography variant="h6" color="error">
            {error || '请以教师身份登录以查看或添加班级。'}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div
      style={{ marginLeft: `${drawerWidth}px` }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-5"
    >
      <Box pt={15} pb={6}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={handleAddNewClass}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded transition-all duration-200 items-center gap-2 shadow-md hover:shadow-lg"
          >
            <AddCircle /> 添加新班级
          </Button>
        </div>
        <Box
          display="grid"
          gap={5}
          m={3}
          sx={{ gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' } }}
        >
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <ClassCard
                key={classItem.classId}
                classData={{
                  className: classItem.className,
                  classCode: classItem.classCode,
                  teacherId: classItem.teacherId,
                  studentIds: classItem.studentIds || [],
                  courseIds: classItem.courseIds || [],
                  courseDetails: classItem.courseDetails || [],
                  classId: classItem.classId,
                }}
                onUpdate={handleClassUpdate}
              />
            ))
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ gridColumn: '1 / -1', textAlign: 'center' }}
            >
              未找到班级。
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ClassList;
