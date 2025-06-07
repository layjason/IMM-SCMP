import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Search from '../../components/courseList/Search';
import CourseCard from '../../components/courseList/CourseCard';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';

// Dummy data loader (replace with real DB call later)
const getCourses = async () => {
  return [
    {
      id: '1',
      title: '程序设计',
      code: 'CS101',
      description: 'Learn the basics of programming using Python.',
      instructor: 'Dr. Alice Smith',
      year: 2024,
    },
    {
      id: '2',
      title: '数据结构',
      code: 'CS201',
      description:
        'Understand fundamental data structures like arrays, stacks, and trees.',
      instructor: 'Prof. Bob Johnson',
      year: 2025,
    },
    {
      id: '3',
      title: '计算机伦理',
      code: 'CS100',
      description: 'Computer science fundamentals.',
      instructor: 'Dr. Alice Johnson',
      year: 2023,
    },
    {
      id: '4',
      title: 'JavaScript程序设计',
      code: 'REACT301',
      description: 'Deep dive into React patterns and hooks.',
      instructor: 'Mr. Jason Lay',
      year: 2025,
    },
    {
      id: '5',
      title: '数据库',
      code: 'DB202',
      description: 'Relational databases, indexing, and SQL.',
      instructor: 'Prof. Maria Gomez',
      year: 2024,
    },
    {
      id: '6',
      title: '操作系统',
      code: 'CS301',
      description: 'Processes, memory management, and file systems.',
      instructor: 'Prof. Kim Lee',
      year: 2025,
    },
    {
      id: '7',
      title: '机器学习',
      code: 'ML101',
      description: 'Supervised, unsupervised learning, and models.',
      instructor: 'Dr. Alan Turing',
      year: 2025,
    },
  ];
};

const drawerWidth = 300;

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await getCourses();
      setCourses(data);
      setFilteredCourses(data);
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const yearterm = parseInt(searchTerm, 10);
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        (!isNaN(yearterm) && course.year === yearterm)
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
          {' '}
          {/* Increased bottom margin from mb={4} to mb={6} */}
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
