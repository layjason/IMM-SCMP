import React from 'react'; // Add this line at the top
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { logout } from '../../services/auth';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          IMM-SCMP
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate('/')}>
          Courses
        </Button>
        <Button color="inherit" onClick={() => navigate('/')}>
          Resources
        </Button>
        <Button color="inherit" onClick={() => navigate('/')}>
          Exercises
        </Button>
        <Button color="inherit" onClick={() => navigate('/')}>
          History
        </Button>
        {role === 'TEACHER' && (
          <Button color="inherit" onClick={() => navigate('/courses/create')}>
            Create Course
          </Button>
        )}
        <Avatar sx={{ ml: 2 }} />
        {/* <Button color="inherit" onClick={logout}>
          Logout
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
