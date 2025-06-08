import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Badge,
} from '@mui/material';
import {
  NotificationsOutlined,
  PersonOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const role = 'TEACHER'; // Mock role
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    console.log('Logging out...');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,
        background: 'linear-gradient(135deg, #1976d2 0%, #3b82f6 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        height: 80, // Increased height
      }}
    >
      <Toolbar sx={{ px: 4, height: '100%' }}>
        {' '}
        {/* Increased padding */}
        {/* Logo */}
        <Typography
          variant="h4" // Larger logo (~32px)
          onClick={() => navigate('/')}
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 800,
            background: 'linear-gradient(45deg, #fff, #e8eaf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
          }}
        >
          IMM-SCMP
        </Typography>
        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 1.5, mr: 4 }}>
          {' '}
          {/* Increased gap and margin */}
          {[
            { label: 'Courses', path: '/courses' },
            { label: 'Resources', path: '/resources' },
            { label: 'Assignment', path: '/assignment' },
            { label: 'Analytics', path: '/history' },
          ].map((item) => (
            <Button
              key={item.label}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                px: 3, // Increased padding
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1.1rem', // Larger text (~17.6px)
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                },
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover:before': {
                  left: '100%',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          {role === 'TEACHER' && (
            <Button
              color="inherit"
              onClick={() => navigate('/courses/create')}
              sx={{
                px: 4, // Increased padding
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 900,
                textTransform: 'none',
                fontSize: '1.1rem',
                background: 'white',
                color: '#1976d2',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              + Create Course
            </Button>
          )}
        </Box>
        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {' '}
          {/* Increased gap */}
          {/* Notifications */}
          <IconButton
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsOutlined sx={{ fontSize: 28 }} />{' '}
              {/* Larger icon */}
            </Badge>
          </IconButton>
          {/* Profile Avatar */}
          <IconButton
            onClick={handleAvatarClick}
            sx={{
              ml: 1,
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 48, // Larger avatar
                height: 48,
                background: 'linear-gradient(45deg, #1976d2, #3b82f6)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                fontSize: '1.25rem', // Larger initials
                fontWeight: 600,
              }}
            >
              JD
            </Avatar>
          </IconButton>
        </Box>
        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: '12px',
              minWidth: 220, // Slightly larger menu
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={handleProfile}
            sx={{
              py: 2, // Increased padding
              px: 2.5,
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
          >
            <PersonOutlined sx={{ mr: 2, color: '#1976d2', fontSize: 24 }} />{' '}
            {/* Larger icon */}
            <Typography variant="body1" fontWeight={500}>
              {' '}
              {/* Larger text */}
              Profile
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              py: 2,
              px: 2.5,
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
          >
            <SettingsOutlined sx={{ mr: 2, color: '#1976d2', fontSize: 24 }} />
            <Typography variant="body1" fontWeight={500} color="1976d2">
              Settings
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 2,
              px: 2.5,
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              color: '#f44336',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
              },
            }}
          >
            <LogoutOutlined sx={{ mr: 2, color: '#f44336', fontSize: 24 }} />
            <Typography variant="body1" fontWeight={500}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
