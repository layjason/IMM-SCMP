import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Search from '../../components/courseList/Search';
import CourseCard from '../../components/courseList/CourseCard';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { SidebarContext } from '../../utils/SidebarContext';
import getCourses from '../../utils/getCourses';
// import getRole from '../../utils/getRole';
import getId from '../../utils/getId';

const CourseList = () => {
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const { instructorId } = useParams();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses(instructorId);
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error('Failed to load courses:', err);
        setCourses([]);
        setFilteredCourses([]);
      }
    };
    loadCourses();

    const role = localStorage.getItem('role') || 'TEACHER';
    setUserRole(role);
  }, [instructorId]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const yearterm = parseInt(searchTerm, 10);
    const filtered = courses.filter(
      (course) =>
        course.title?.toLowerCase().includes(term) ||
        course.code?.toLowerCase().includes(term) ||
        course.instructor?.toLowerCase().includes(term) ||
        (!isNaN(yearterm) && course.year === yearterm)
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const handleAddClass = () => {
    navigate(`/classes/${instructorId || getId() || 'T73066209'}/create`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f9fafb',
          p: 3,
          ml: `${drawerWidth}px`,
          mt: '64px',
        }}
      >
        <Box mt={6} mb={6}>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {userRole === 'TEACHER' && (
            <Button
              onClick={handleAddClass}
              startIcon={<AddCircleOutline />}
              sx={{
                mt: 2,
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                color: 'white',
                fontWeight: 'bold',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to right, #1d4ed8, #4338ca)',
                },
              }}
            >
              Add Class
            </Button>
          )}
        </Box>
        <Box
          display="grid"
          gap={5}
          m={3}
          sx={{ gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' } }}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} courseData={course} />
            ))
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              gridColumn="span 3"
            >
              No courses found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CourseList;
