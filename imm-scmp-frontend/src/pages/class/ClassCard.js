import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Schedule,
  Group,
  School,
  Add,
  Edit,
  MoreVert,
} from '@mui/icons-material';

const ClassCard = ({ classData }) => {
  const {
    id,
    name,
    code,
    instructor,
    subject,
    year,
    semester,
    description,
    studentsCount,
    maxCapacity,
    schedule,
    courses,
  } = classData;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const getCapacityColor = () => {
    const percentage = (studentsCount / maxCapacity) * 100;
    if (percentage >= 90) return 'error';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  const handleAddCourse = () => {
    console.log('Add course to class:', id);
    // Here you would implement the logic to add courses to this class
  };

  const handleEditClass = () => {
    console.log('Edit class:', id);
    // Here you would implement the logic to edit the class
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        border: '1px solid #e0e0e0',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header with class info and actions */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box flex={1}>
            <Typography
              variant="h6"
              component="h3"
              fontWeight="bold"
              gutterBottom
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {code}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Tooltip title="Add Course">
              <IconButton
                size="small"
                onClick={handleAddCourse}
                color="primary"
              >
                <Add />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Class">
              <IconButton size="small" onClick={handleEditClass}>
                <Edit />
              </IconButton>
            </Tooltip>
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        {/* Instructor */}
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
            {getInitials(instructor)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {instructor}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Instructor
            </Typography>
          </Box>
        </Box>

        {/* Subject and semester */}
        <Box display="flex" gap={1} mb={2}>
          <Chip
            label={subject}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${semester} ${year}`}
            size="small"
            color="secondary"
            variant="outlined"
          />
        </Box>

        {/* Description */}
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
        >
          {description}
        </Typography>

        {/* Class details */}
        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {schedule}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Group sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {studentsCount}/{maxCapacity} students
            </Typography>
            <Chip
              label={`${Math.round((studentsCount / maxCapacity) * 100)}%`}
              size="small"
              color={getCapacityColor()}
              sx={{ ml: 'auto', fontSize: '0.7rem', height: 20 }}
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <School sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {courses.length} course{courses.length !== 1 ? 's' : ''} assigned
            </Typography>
          </Box>
        </Box>

        {/* Assigned courses */}
        {courses.length > 0 && (
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
              {courses.slice(0, 2).map((course) => (
                <Chip
                  key={course.id}
                  label={course.code}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              ))}
              {courses.length > 2 && (
                <Chip
                  label={`+${courses.length - 2} more`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              )}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Footer actions */}
      <Box px={3} pb={2}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => console.log('View class details:', id)}
          sx={{ textTransform: 'none' }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default ClassCard;
