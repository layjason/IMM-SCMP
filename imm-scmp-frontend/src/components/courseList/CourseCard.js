import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ArrowBack, Book } from '@mui/icons-material';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { SidebarContext } from '../../utils/SidebarContext';
import getClasses from '../../utils/getClasses';
import getCourses from '../../utils/getCourses';

const ClassDetails = () => {
  const { instructorId, classId } = useParams();
  const navigate = useNavigate();
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;
  const [classData, setClassData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const classes = await getClasses(instructorId);
        const selectedClass = classes.find((cls) => cls.id === classId);
        if (selectedClass) {
          setClassData(selectedClass);
          const allCourses = await getCourses();
          const classCourses = allCourses.filter((course) =>
            selectedClass.courses.includes(course.id)
          );
          setCourses(classCourses);
        }
      } catch (err) {
        console.error('Failed to load class details:', err);
      }
    };
    loadClassDetails();
  }, [instructorId, classId]);

  const handleBack = () => {
    navigate(`/classes/${instructorId || 'T73066209'}`);
  };

  if (!classData) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '64px',
            ml: `${drawerWidth}px`,
            bgcolor: '#f9fafb',
          }}
        >
          <Typography variant="h6">Class not found.</Typography>
        </Box>
      </Box>
    );
  }

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
          mt: '64px',
          ml: `${drawerWidth}px`,
        }}
      >
        <Box mb={4}>
          <Button
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={{ textTransform: 'none' }}
          >
            Back to Classes
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom>
          {classData.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Code: {classData.code}
        </Typography>
        <Typography variant="body1" mb={2}>
          Description: {classData.description}
        </Typography>
        <Typography variant="body1" mb={2}>
          Instructor: {classData.instructor}
        </Typography>
        <Typography variant="body1" mb={2}>
          Year: {classData.year} | Semester: {classData.semester}
        </Typography>
        <Typography variant="body1" mb={2}>
          Subject: {classData.subject}
        </Typography>
        <Typography variant="body1" mb={2}>
          Schedule: {classData.schedule}
        </Typography>
        <Typography variant="body1" mb={2}>
          Students: {classData.studentsCount}/{classData.maxCapacity}
        </Typography>
        <Typography variant="h6" mb={2}>
          Associated Courses ({classData.courseCount})
        </Typography>
        {courses.length > 0 ? (
          <List>
            {courses.map((course) => (
              <ListItem key={course.id}>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Book sx={{ mr: 1, color: 'primary.main' }} />
                      {course.title}
                    </Box>
                  }
                  secondary={`Code: ${course.code} | Instructor: ${course.instructor}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No courses assigned.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ClassDetails;
