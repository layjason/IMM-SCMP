import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Search from '../../components/courseList/Search';
import CourseCard from '../../components/courseList/CourseCard';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { SidebarContext } from '../../utils/SidebarContext';
import getCourses from '../../utils/getCourses';
import getId from '../../utils/getId';

const CourseList = () => {
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await getCourses();
      const instructorName = `Instructor ${getId()}`;
      const filtered = data.filter(
        (course) => course.instructor === instructorName
      );
      console.log(filtered);
      setCourses(filtered);
      setFilteredCourses(filtered);
    };
    loadCourses();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const yearTerm = parseInt(searchTerm, 10);
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        (!isNaN(yearTerm) && course.year === yearTerm)
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

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
        </Box>
        <Box
          display="grid"
          gap={5}
          m={3}
          sx={{ gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' } }}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
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
