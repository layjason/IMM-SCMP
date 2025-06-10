import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { Group, School, Add, Edit } from '@mui/icons-material';
import getCourses from '../utils/getCourses';

const ClassCard = ({ classData, onUpdate }) => {
  const { classId, className, teacherId, courseIds, studentIds, year } =
    classData;

  const [openAddCourseDialog, setOpenAddCourseDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseDetails, setCourseDetails] = useState([]);
  const [editForm, setEditForm] = useState({
    className: className,
    year: year,
  });

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((word) => word[0])
          .join('')
          .toUpperCase()
      : '';
  };

  const getCapacityColor = () => {
    const maxCapacity = 30;
    const percentage = (studentIds.length / maxCapacity) * 100;
    if (percentage >= 90) return 'error';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courses = await getCourses();
      const details = courses.filter((course) => courseIds.includes(course.id));
      setCourseDetails(details);
    };
    fetchCourseDetails();
  }, [courseIds]);

  const handleAddCourseClick = async () => {
    const courses = await getCourses();
    const unassignedCourses = courses.filter(
      (course) => !courseIds.includes(course.id)
    );
    console.log(unassignedCourses);
    setAvailableCourses(unassignedCourses);
    setOpenAddCourseDialog(true);
  };

  const handleCloseAddCourseDialog = () => {
    setOpenAddCourseDialog(false);
    setSelectedCourse('');
  };

  const handleAddCourse = async () => {
    if (selectedCourse && !courseIds.includes(selectedCourse)) {
      const updatedClass = {
        ...classData,
        courseIds: [...courseIds, selectedCourse],
      };
      // Update localStorage
      const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      const updatedClasses = storedClasses.map((c) =>
        c.classId === classId ? updatedClass : c
      );
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      onUpdate(updatedClass);
      // Update course details
      const courses = await getCourses();
      const newCourse = courses.find((c) => c.id === selectedCourse);
      if (newCourse) {
        setCourseDetails((prev) => [...prev, newCourse]);
      }
      handleCloseAddCourseDialog();
    }
  };

  const handleEditClick = () => {
    setEditForm({
      className,
      year,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedClass = {
      ...classData,
      className: editForm.className,
      description: editForm.description,
      schedule: editForm.schedule,
      subject: editForm.subject,
      semester: editForm.semester,
      year: parseInt(editForm.year, 10),
    };
    // Update localStorage
    const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
    const updatedClasses = storedClasses.map((c) =>
      c.classId === classId ? updatedClass : c
    );
    localStorage.setItem('classes', JSON.stringify(updatedClasses));
    onUpdate(updatedClass);
    handleCloseEditDialog();
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 h-[500px] flex flex-col">
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <div className="">
          <div className="flex  space-between flex-start pb-2">
            <Box flex={1}>
              <Typography
                variant="h6"
                component="h3"
                fontWeight="bold"
                gutterBottom
              >
                {className}
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Tooltip title="Add Course">
                <IconButton
                  size="small"
                  onClick={handleAddCourseClick}
                  color="white"
                >
                  <Add />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Class">
                <IconButton size="small" onClick={handleEditClick}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Box>
          </div>
        </div>

        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 2,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
              }}
            >
              {getInitials(teacherId)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {teacherId}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Instructor
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={1} mb={2}>
            <Chip
              label={` ${year}`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        ></Typography>

        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Group sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {studentIds.length}/30 students
            </Typography>
            <Chip
              label={`${Math.round((studentIds.length / 30) * 100)}%`}
              size="small"
              color={getCapacityColor()}
              sx={{ ml: 'auto', fontSize: '0.7rem', height: 20 }}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <School sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {courseIds.length} course{courseIds.length !== 1 ? 's' : ''}{' '}
              assigned
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={1}>
          {courseDetails.length > 0 && (
            <Box mb={2}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={1}
              >
                Assigned Courses:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={0.5}>
                {courseDetails.map((course) => (
                  <Chip
                    key={course.id}
                    label={`${course.id}: ${course.title}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem', height: 20 }}
                  />
                ))}
                {/* {courseDetails.length > 2 && (
                  <Chip
                    label={`+${courseDetails.length - 2} more`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem', height: 20 }}
                  />
                )} */}
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>

      <Box px={3} pb={2}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => console.log('View class details:', classId)}
          sx={{ textTransform: 'none' }}
        >
          View Details
        </Button>
      </Box>

      {/* Add Course Dialog */}
      <Dialog
        open={openAddCourseDialog}
        onClose={handleCloseAddCourseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Course to {className}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              label="Select Course"
            >
              {availableCourses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title} ({course.code})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCourseDialog}>Cancel</Button>
          <Button
            onClick={handleAddCourse}
            color="primary"
            variant="contained"
            disabled={!selectedCourse}
          >
            Add Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Class: {className}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Class Name"
            name="className"
            value={editForm.className}
            onChange={handleEditChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Schedule"
            name="schedule"
            value={editForm.schedule}
            onChange={handleEditChange}
            margin="normal"
            helperText="e.g., Mon, Wed, Fri 10:00-11:00"
          />
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={editForm.subject}
            onChange={handleEditChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Semester</InputLabel>
            <Select
              name="semester"
              value={editForm.semester}
              onChange={handleEditChange}
              label="Semester"
            >
              <MenuItem value="Fall">Fall</MenuItem>
              <MenuItem value="Spring">Spring</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Year"
            name="year"
            type="number"
            value={editForm.year}
            onChange={handleEditChange}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            onClick={handleSaveEdit}
            color="primary"
            variant="contained"
            disabled={!editForm.className || !editForm.year}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassCard;
