// import { useEffect, useState } from 'react';
// import { Box, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

// function CourseList() {
//   const [courses, setCourses] = useState([]);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [deleteCourseId, setDeleteCourseId] = useState(null);
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     api.get('/courses').then((response) => setCourses(response.data));
//   }, []);

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/courses/${deleteCourseId}`);
//       setCourses(courses.filter((course) => course.id !== deleteCourseId));
//       setOpenDeleteDialog(false);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Failed to delete course');
//     }
//   };

//   return (
//     <Box sx={{ p: 3, ml: '240px', mt: 8 }}>
//       {role === 'TEACHER' && (
//         <Button variant="contained" onClick={() => navigate('/courses/create')} sx={{ mb: 2 }}>
//           Create Course
//         </Button>
//       )}
//       <Grid container spacing={2}>
//         {courses.map((course) => (
//           <Grid item xs={12} sm={6} md= key={course.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{course.name}</Typography>
//                 <Typography color="textSecondary">Code: {course.code}</Typography>
//                 <Button onClick={() => navigate(`/courses/${course.id}`)}>View Details</Button>
//                 {role === 'TEACHER' && (
//                   <>
//                     <Button onClick={() => navigate(`/courses/${course.id}/edit`)}>Edit</Button>
//                     <Button color="error" onClick={() => { setDeleteCourseId(course.id); setOpenDeleteDialog(true); }}>
//                       Delete
//                     </Button>
//                   </>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>Are you sure you want to delete this course?</DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
//           <Button onClick={handleDelete} color="error">Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default CourseList;
